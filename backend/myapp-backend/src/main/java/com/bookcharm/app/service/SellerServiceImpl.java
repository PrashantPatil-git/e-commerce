package com.bookcharm.app.service;

import java.util.Optional;

import com.bookcharm.app.dto.*;
import com.bookcharm.app.exception.AuthenticationFailedException;
import com.bookcharm.app.exception.ClientErrorException;
import com.bookcharm.app.exception.EmailAlreadyExistsException;
import com.bookcharm.app.exception.UserNotFoundException;
import com.bookcharm.app.model.ShoppingCart;
import com.bookcharm.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bookcharm.app.model.Seller;
import com.bookcharm.app.repository.SellerRepository;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class SellerServiceImpl implements SellerService {


    @Autowired
    private SellerRepository sellerRepository;

    private final WebClient.Builder builder;
    private WebClient authenticationServiceWebClient;
    private WebClient mailServiceWebClient;

    public SellerServiceImpl(@Value("${url.authentication-service-base-url}") String authenticationServiceBaseUrl, @Value("${url.notification-service-base-url}") String notificationServiceBaseUrl, WebClient.Builder builder) {
        this.builder = builder;
        this.authenticationServiceWebClient = builder.baseUrl(authenticationServiceBaseUrl).build();
        this.mailServiceWebClient = builder.baseUrl(notificationServiceBaseUrl).build();
    }

    @Override
    public Seller getSellerById(Long sellerId) {
        Optional<Seller> optionalSeller = sellerRepository.findById(sellerId);
        return optionalSeller.orElse(null);
    }

    @Override
    public Seller createSeller(SellerRegistrationDto sellerRegistrationDto) {
        // Add logic for seller creation, validation, etc.

        // find whether seller already exists in db with email address

        // validate mobile number

        Optional<Seller> optionalSeller = sellerRepository.findByEmail(sellerRegistrationDto.getEmail());

        if (optionalSeller.isPresent()) {
            // throw error as user with email already exists
            Seller user = optionalSeller.get();
            throw new EmailAlreadyExistsException("Email address is already in use");
        } else {
            // means seller with email address does not exists
            // next steps
            // validate the seller details
            // email,
            // call authentication-mail service to create as well as get the User, and token if valid

            SellerRegistrationResponse sellerRegistrationResponse = authenticationServiceWebClient.post().uri("/seller/register")
                    .body(BodyInserters.fromValue(sellerRegistrationDto))
                    .retrieve()
                    .onStatus(HttpStatus::is4xxClientError, clientResponse -> handleClientError(clientResponse))
                    .bodyToMono(SellerRegistrationResponse.class)
                    .block();

            System.out.println(sellerRegistrationResponse.getSellerRegistrationDto());

            SellerRegistrationDto newSellerRegistrationDto = sellerRegistrationResponse.getSellerRegistrationDto();
            Seller newSeller = new Seller();
            newSeller.setEmail(newSellerRegistrationDto.getEmail());
            newSeller.setFirstName(newSellerRegistrationDto.getFirstName());
            newSeller.setLastName(newSellerRegistrationDto.getLastName());
            newSeller.setMobileNumber(newSellerRegistrationDto.getMobileNumber());
            newSeller.setPanNumber(newSellerRegistrationDto.getPanNumber());
            newSeller.setPassWord(newSellerRegistrationDto.getPassWord());


            newSeller = sellerRepository.save(newSeller);

            // notify to the user for,
            // greet and say we're reached to you by email once we verified your account

            try{
                mailServiceWebClient.post().uri("/seller/registration").body(BodyInserters.fromValue(newSeller)).retrieve().onStatus(HttpStatus::is4xxClientError,response -> handleClientError(response)).bodyToMono(Void.class).subscribe();
            }catch (Exception e){
                e.printStackTrace();
            }

            return newSeller;
        }
    }


    @Override
    public SellerResponse loginSeller(SellerLoginDto sellerLoginDto){

        // find whether user with email exists or not

        String email = sellerLoginDto.getEmail();
        String passWord = sellerLoginDto.getPassWord();

        // if user not exists
        // return error with message "user not exists with this email"
        // if exists
        // send user for authentication with userLoginDto to compare the passwords and get the token
        //      if error occured means password didn't match
        //      else
        //      send the LoginResponse with (User and token)


        Optional<Seller> optionalSeller = sellerRepository.findByEmail(email);

        if(optionalSeller.isPresent() && optionalSeller.get().isVerified()){

            Seller seller = optionalSeller.get();
            SellerLoginValidationDto sellerLoginValidationDto = new SellerLoginValidationDto();
            sellerLoginValidationDto.setSellerId(seller.getSellerId());
            sellerLoginValidationDto.setSellerPassWord(seller.getPassWord());
            sellerLoginValidationDto.setValidationPassWord(sellerLoginDto.getPassWord());

            String jwtToken = authenticationServiceWebClient.post().uri("/seller/login").body(BodyInserters.fromValue(sellerLoginValidationDto)).retrieve().onStatus(HttpStatus::is4xxClientError,clientResponse ->  handleClientError(clientResponse)).bodyToMono(SellerResponse.class).map(SellerResponse::getToken).block();
            // if everything is fine return response
            return new SellerResponse(seller, jwtToken);

        }else{
            // if user not exists
            throw new UserNotFoundException("Seller with " + email + " not found");
        }

    }

    @Override
    public Seller updateSeller(Long sellerId, Seller updatedSeller) {
        Optional<Seller> optionalSeller = sellerRepository.findById(sellerId);
        if (optionalSeller.isPresent()) {
            Seller existingSeller = optionalSeller.get();
            // Update the existing seller with the new information
            existingSeller.setFirstName(updatedSeller.getFirstName());
            existingSeller.setLastName(updatedSeller.getLastName());
            existingSeller.setPanNumber(updatedSeller.getPanNumber());
            existingSeller.setMobileNumber(updatedSeller.getMobileNumber());
            existingSeller.setEmail(updatedSeller.getEmail());
            existingSeller.setPassWord(updatedSeller.getPassWord());

            // Save and return the updated seller
            return sellerRepository.save(existingSeller);
        }
        return null;
    }

    @Override
    public boolean deleteSeller(Long sellerId) {
        if (sellerRepository.existsById(sellerId)) {
            sellerRepository.deleteById(sellerId);
            return true;
        }
        return false;
    }
    
    // Only admin will able to check un verified sellers
    @Override
   	public ResponseEntity<?> getAllUnVerifiedSellers(String jwtToken) {
   		
       	
       	Long adminId = webClient.post().uri("/users/validate-token").header(HttpHeaders.AUTHORIZATION, jwtToken).retrieve().onStatus(HttpStatus::is4xxClientError , clientResponse->
           handleClientError(clientResponse)).bodyToMono(AuthenticationResponse.class).map(AuthenticationResponse::getUserId).block();
           
       	if(sellerRepository.existsById(adminId)) {
       		
       		return sellerRepository.getAllUnVerifiedSellers();
       	
       	}
       	
       	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNATHOURISED");
   		
   	}



    // handle client error if, token is invalid throw UnauthorizedAccessException or throw ClientErrorException
    private Mono<? extends Throwable> handleClientError(ClientResponse clientResponse) {

        // through an error when user password not matched with passed password
        if(clientResponse.statusCode().equals(HttpStatus.UNAUTHORIZED)){
            return Mono.error(new AuthenticationFailedException("password not match"));
        }

        return Mono.error(new ClientErrorException("Client Error: " + clientResponse.statusCode()));

    }
}

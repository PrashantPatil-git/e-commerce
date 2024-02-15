package com.bookcharm.app.service;

import com.bookcharm.app.dto.AuthenticationResponse;
import com.bookcharm.app.dto.LoginResponse;
import com.bookcharm.app.dto.LoginValidationDto;
import com.bookcharm.app.dto.UserLoginDto;
import com.bookcharm.app.exception.AuthenticationFailedException;
import com.bookcharm.app.exception.ClientErrorException;
import com.bookcharm.app.exception.UserNotFoundException;
import com.bookcharm.app.model.Admin;
import com.bookcharm.app.model.Seller;
import com.bookcharm.app.model.User;
import com.bookcharm.app.repository.AdminRepository;
import com.bookcharm.app.repository.SellerRepository;

import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;
    private SellerRepository sellerRepository;
    
    
    private WebClient.Builder builder;

    final private WebClient authenticationServiceWebClient;
    final private WebClient mailServiceWebClient;

    public AdminServiceImpl(@Value("${url.authentication-service-base-url}") String authenticationServiceBaseUrl, @Value("${url.notification-service-base-url}") String notificationServiceBaseUrl,  WebClient.Builder builder) {
        this.builder = builder;
        this.authenticationServiceWebClient = builder.baseUrl(authenticationServiceBaseUrl).build();
        this.mailServiceWebClient = builder.baseUrl(notificationServiceBaseUrl).build();
    }
    

    public String loginAdmin(UserLoginDto userLoginDto) {
    	
    	
    	String email = userLoginDto.getEmail();
    	String passWord = userLoginDto.getPassWord();
    	
    	Admin admin = adminRepository.findByEmail(email);
    	
    	
    	 if(admin!=null){

            
             LoginValidationDto loginValidationDto = new LoginValidationDto();
             loginValidationDto.setUserId(admin.getAdminId());
             loginValidationDto.setUserPassword(admin.getPassWord());
             loginValidationDto.setValidationPassword(userLoginDto.getPassWord());

             String jwtToken = authenticationServiceWebClient.post().uri("/user/login").body(BodyInserters.fromValue(loginValidationDto)).retrieve().onStatus(HttpStatus::is4xxClientError,clientResponse ->  handleClientError(clientResponse)).bodyToMono(LoginResponse.class).map(LoginResponse::getToken).block();
             // if everything is fine return response
             
             return jwtToken;

         }else{
             // if user not exists
             throw new UserNotFoundException("User with " + email + " not found");
         }

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

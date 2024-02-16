package com.bookcharm.app.controller;

import com.bookcharm.app.dto.RegistrationResponse;
import com.bookcharm.app.dto.SellerLoginDto;
import com.bookcharm.app.dto.SellerRegistrationDto;
import com.bookcharm.app.dto.SellerResponse;
import com.bookcharm.app.exception.*;
import com.bookcharm.app.model.Seller;
import com.bookcharm.app.service.SellerService;
import com.bookcharm.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sellers")
public class SellerController {

    @Autowired
    private SellerService sellerService;



    @GetMapping("/{sellerId}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long sellerId) {
        Seller seller = sellerService.getSellerById(sellerId);
        if (seller != null) {
            return ResponseEntity.ok(seller);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // post mapping on seller for registering the user
    @PostMapping
    public ResponseEntity<?> createSeller(@RequestBody SellerRegistrationDto sellerRegistrationDto) {

        try {
            Seller seller = sellerService.createSeller(sellerRegistrationDto);
            return ResponseEntity.ok("Seller Registration Request is under processing");
        }

        catch (EmailAlreadyExistsException e) {
            return new ResponseEntity<>("Email address is already in use", HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginSeller(@RequestBody SellerLoginDto sellerLoginDto){

        try{
            SellerResponse sellerResponse = sellerService.loginSeller(sellerLoginDto);
            return new ResponseEntity<SellerResponse>(sellerResponse, HttpStatus.OK);

        }catch (UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found " + ex.getMessage());
        }catch (AuthenticationFailedException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication Failed " + ex.getMessage());
        }

    }

    @PutMapping("/{sellerId}")
    public ResponseEntity<Seller> updateSeller(@PathVariable Long sellerId, @RequestBody Seller seller) {
        Seller updatedSeller = sellerService.updateSeller(sellerId, seller);
        if (updatedSeller != null) {
            return ResponseEntity.ok(updatedSeller);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{sellerId}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long sellerId) {
        boolean deleted = sellerService.deleteSeller(sellerId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @GetMapping
    public ResponseEntity<?> getAllUnVerifiedSellers(@RequestHeader String Authorization){
    	
    	String jwtToken = Authorization;

        // authorize whether request is made by admin or not

        try {

            List<Seller> sellers = sellerService.getAllUnVerifiedSellers(jwtToken);
            System.out.println(sellers);
            return new ResponseEntity<>(sellers, HttpStatus.OK);
        }catch(UnauthorizedAccessException e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }catch (ClientErrorException e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    	
    }


}

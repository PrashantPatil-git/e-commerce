package com.bookcharm.app.controller;

import com.bookcharm.app.dto.RegistrationResponse;
import com.bookcharm.app.dto.SellerLoginDto;
import com.bookcharm.app.dto.SellerRegistrationDto;
import com.bookcharm.app.dto.SellerResponse;
import com.bookcharm.app.exception.AuthenticationFailedException;
import com.bookcharm.app.exception.EmailAlreadyExistsException;
import com.bookcharm.app.exception.UserNotFoundException;
import com.bookcharm.app.model.Seller;
import com.bookcharm.app.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getAllUnVerifiedSellers(@RequestHeader String authorization){
    	
    	String jwtToken = authorization;
    	
    	ResponseEntity<?> sellers = sellerService.getAllUnVerifiedSellers(jwtToken);
    	
    	return sellers != null ? new ResponseEntity<>(sellers, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	
    }


}

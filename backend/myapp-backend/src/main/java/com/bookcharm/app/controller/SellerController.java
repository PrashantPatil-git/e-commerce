package com.bookcharm.app.controller;

import com.bookcharm.app.dto.RegistrationResponse;
import com.bookcharm.app.dto.SellerRegistrationDto;
import com.bookcharm.app.dto.SellerResponse;
import com.bookcharm.app.exception.EmailAlreadyExistsException;
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

}

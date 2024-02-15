package com.bookcharm.app.service;

import org.springframework.http.ResponseEntity;

import com.bookcharm.app.dto.SellerRegistrationDto;
import com.bookcharm.app.dto.SellerResponse;
import com.bookcharm.app.model.Seller;

public interface SellerService {
    Seller getSellerById(Long sellerId);
    Seller createSeller(SellerRegistrationDto sellerRegistrationDto);
    Seller updateSeller(Long sellerId, Seller seller);
    boolean deleteSeller(Long sellerId);
    SellerResponse loginSeller(SellerLoginDto sellerLoginDto);
    // Other SellerService methods
	ResponseEntity<?> getAllUnVerifiedSellers(String jwtToken);
}

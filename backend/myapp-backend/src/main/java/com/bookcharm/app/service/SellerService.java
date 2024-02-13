package com.bookcharm.app.service;

import com.bookcharm.app.model.Seller;

public interface SellerService {
    Seller getSellerById(Long sellerId);
    Seller createSeller(Seller seller);
    Seller updateSeller(Long sellerId, Seller seller);
    boolean deleteSeller(Long sellerId);
    // Other SellerService methods
}

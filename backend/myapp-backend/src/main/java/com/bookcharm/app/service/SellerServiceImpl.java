package com.bookcharm.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookcharm.app.model.Seller;
import com.bookcharm.app.repository.SellerRepository;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public Seller getSellerById(Long sellerId) {
        Optional<Seller> optionalSeller = sellerRepository.findById(sellerId);
        return optionalSeller.orElse(null);
    }

    @Override
    public Seller createSeller(Seller seller) {
        // Add logic for seller creation, validation, etc.
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSeller(Long sellerId, Seller updatedSeller) {
        Optional<Seller> optionalSeller = sellerRepository.findById(sellerId);
        if (optionalSeller.isPresent()) {
            Seller existingSeller = optionalSeller.get();
            // Update the existing seller with the new information
            existingSeller.setFirstName(updatedSeller.getFirstName());
            existingSeller.setLastName(updatedSeller.getLastName());
            existingSeller.setProductCount(updatedSeller.getProductCount());
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

    // Add other SellerService methods if needed
}

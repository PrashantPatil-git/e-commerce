package com.bookcharm.app.repository;

import com.bookcharm.app.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    // Additional seller-specific query methods if needed
}

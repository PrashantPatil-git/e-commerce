package com.bookcharm.app.repository;

import com.bookcharm.app.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    // Additional address-specific query methods if needed
}

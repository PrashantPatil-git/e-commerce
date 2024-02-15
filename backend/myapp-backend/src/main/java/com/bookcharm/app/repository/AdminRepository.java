package com.bookcharm.app.repository;

import com.bookcharm.app.model.Admin;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {

	public Admin findByEmail(String email);
    // Additional admin-specific query methods if needed
}

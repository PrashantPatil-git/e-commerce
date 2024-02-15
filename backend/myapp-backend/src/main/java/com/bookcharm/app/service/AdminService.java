package com.bookcharm.app.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.bookcharm.app.dto.UserLoginDto;
import com.bookcharm.app.model.Admin;
import com.bookcharm.app.model.Seller;

public interface AdminService {

	String loginAdmin(UserLoginDto userLoginDto);

	

	
   
    // Other AdminService methods
}

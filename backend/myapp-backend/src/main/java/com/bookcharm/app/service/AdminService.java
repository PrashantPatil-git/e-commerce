package com.bookcharm.app.service;

import java.util.List;

import com.bookcharm.app.dto.UserLoginDto;
import com.bookcharm.app.model.Admin;
import com.bookcharm.app.model.Seller;

public interface AdminService {

	String loginAdmin(UserLoginDto userLoginDto);

	List<Seller> getAllSellers(String jwtToken);
   
    // Other AdminService methods
}

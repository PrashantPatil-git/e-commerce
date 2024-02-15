package com.bookcharm.app.controller;

import com.bookcharm.app.dto.UserLoginDto;
import com.bookcharm.app.exception.AuthenticationFailedException;
import com.bookcharm.app.exception.UserNotFoundException;
import com.bookcharm.app.model.Admin;
import com.bookcharm.app.model.Seller;
import com.bookcharm.app.service.AdminService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody UserLoginDto userLoginDto){
    	
    	try {
    		String token = adminService.loginAdmin(userLoginDto);
    		return new ResponseEntity<String>(token,HttpStatus.OK);
    	}catch(UserNotFoundException ex) {
    		return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT_FOUNT "+ ex.getMessage());
    	}catch(AuthenticationFailedException ex) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed "+ex.getMessage());
    	}
    	
    }
    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(@RequestHeader String authorization){
    	
    	String jwtToken = authorization;
    	
    	List<Seller> sellers = adminService.getAllSellers(jwtToken);
    	
    	return sellers != null ? new ResponseEntity<>(sellers, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	
    }

}

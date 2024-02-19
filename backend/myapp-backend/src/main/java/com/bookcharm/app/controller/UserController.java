package com.bookcharm.app.controller;
import com.bookcharm.app.dto.*;
import com.bookcharm.app.exception.AuthenticationFailedException;
import com.bookcharm.app.exception.EmailAlreadyExistsException;
import com.bookcharm.app.exception.InvalidEmailException;
import com.bookcharm.app.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookcharm.app.model.User;
import com.bookcharm.app.service.UserService;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto userLoginDto){

        try{
            LoginResponse loginResponse =  userService.loginUser(userLoginDto);
            return new ResponseEntity<LoginResponse>(loginResponse, HttpStatus.OK);
            
        }catch (UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found " + ex.getMessage());
        }catch (AuthenticationFailedException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication Failed " + ex.getMessage());
        }catch (InvalidEmailException ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Authentication Failed : " + ex.getMessage());
        }

    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserRegistrationDto userRegistrationDto) {

        // send a request to authentication-mail service microservice

        try {
            RegistrationResponse registrationResponse = userService.createUser(userRegistrationDto);
            return new ResponseEntity<RegistrationResponse>(registrationResponse, HttpStatus.CREATED);
        }
        catch (EmailAlreadyExistsException e) {

            return new ResponseEntity<>("Email address is already in use", HttpStatus.CONFLICT);

        }



    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserDto updateUserDto, HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        System.out.println(token);

////        User updatedUser = userService.updateUser(userId, user);
//        if (updatedUser != null) {
//            return ResponseEntity.ok(updatedUser);
//        } else {
//            return ResponseEntity.notFound().build();
//        }

        return ResponseEntity.ok().body("Reached");
    }




}

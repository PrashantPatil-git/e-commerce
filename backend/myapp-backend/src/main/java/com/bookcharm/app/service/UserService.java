package com.bookcharm.app.service;

import com.bookcharm.app.model.User;

public interface UserService {
    User getUserById(Long userId);
    User createUser(User user);
    User updateUser(Long userId, User user);
    boolean deleteUser(Long userId);

    // Cart-related methods
//    void addToCart(Long userId, Long productId, Integer quantity);
//    void removeFromCart(Long userId, Long productId);

    // Other UserService methods
}

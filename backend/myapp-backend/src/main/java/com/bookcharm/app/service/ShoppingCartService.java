package com.bookcharm.app.service;

import com.bookcharm.app.dto.CartDto;
import com.bookcharm.app.model.ShoppingCart;

public interface ShoppingCartService {
    ShoppingCart getShoppingCart(String jwtToken);
    ShoppingCart updateShoppingCart(String jwtToken, CartDto cartDto);
}

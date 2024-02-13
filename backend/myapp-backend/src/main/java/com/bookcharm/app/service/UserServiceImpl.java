package com.bookcharm.app.service;

import com.bookcharm.app.model.Product;
import com.bookcharm.app.model.ShoppingCart;
import com.bookcharm.app.model.User;
import com.bookcharm.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional; 

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long userId, User user) {
        if (userRepository.existsById(userId)) {
            user.setUserId(userId); // Ensure the provided user object has the correct ID
            return userRepository.save(user);
        }
        return null; // User with the given ID does not exist
    }

    @Override
    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false; // User with the given ID does not exist
    }
//    @Override
//    public void addToCart(Long userId, Long productId, Integer quantity) {
//        User user = userRepository.findById(userId).orElse(null);
//
//        if (user != null) {
//            // Implement logic to add the specified product to the user's cart
//            // For simplicity, assume user has a single cart
//            // You might need to handle scenarios with multiple carts differently
//
//            // Assume user has a method like getShoppingCart() to get the cart
//            ShoppingCart cart = user.getShoppingCart();
//
//            // Check if the product is already in the cart
//            Optional<Product> existingProduct = cart.getProducts().stream()
//                    .filter(product -> product.getProductId().equals(productId))
//                    .findFirst();
//
//            if (existingProduct.isPresent()) {
//                // Product is already in the cart, update quantity
//                Product product = existingProduct.get();
//                product.setStock(product.getStock() + quantity);
//            } else {
//                // Product is not in the cart, create a new entry
//                Product newProduct = new Product(); // Instantiate Product with proper values
//                newProduct.setProductId(productId);
//                newProduct.setStock(quantity);
//
//                // Add the new product to the cart
//                cart.getProducts().add(newProduct);
//            }
//
//            // Save the updated user with the modified cart
//            userRepository.save(user);
//        }
//    }
//
//    @Override
//    public void removeFromCart(Long userId, Long productId) {
//        User user = userRepository.findById(userId).orElse(null);
//
//        if (user != null) {
//            // Implement logic to remove the specified product from the user's cart
//            // For simplicity, assume user has a single cart
//            // You might need to handle scenarios with multiple carts differently
//
//            // Assume user has a method like getShoppingCart() to get the cart
//            ShoppingCart cart = user.getShoppingCart();
//
//            // Remove the product from the cart
//            cart.getProducts().removeIf(product -> product.getProductId().equals(productId));
//
//            // Save the updated user with the modified cart
//            userRepository.save(user);
//        }
//    }
}

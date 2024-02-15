package com.bookcharm.app.service;

import com.bookcharm.app.model.Product;
import com.bookcharm.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.orElse(null);
    }

    @Override
    public Product addProduct(Product product) {
        // Add logic for product creation, validation, etc.
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long productId, Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            // Update the existing product with the new information
            existingProduct.setProductName(updatedProduct.getProductName());
            existingProduct.setProductPrice(updatedProduct.getProductPrice());
            existingProduct.setProductDescription(updatedProduct.getProductDescription());
            existingProduct.setProductImage(updatedProduct.getProductImage());
            existingProduct.setStock(updatedProduct.getStock());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setSeller(updatedProduct.getSeller());
            existingProduct.setViewCount(updatedProduct.getViewCount());
            existingProduct.setAuthor(updatedProduct.getAuthor());
            existingProduct.setIsbn(updatedProduct.getIsbn());

            // Save and return the updated product
            return productRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    public boolean deleteProduct(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
            return true;
        }
        return false;
    }

    // Add other ProductService methods if needed
}

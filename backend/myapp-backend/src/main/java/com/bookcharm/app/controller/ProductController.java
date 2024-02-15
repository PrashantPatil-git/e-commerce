package com.bookcharm.app.controller;

import com.bookcharm.app.jwtVarifiaction.JwtUtil;
import com.bookcharm.app.model.Product;
import com.bookcharm.app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    //Seller will add Product
    @PostMapping
    public ResponseEntity<?> AddProduct(@RequestBody Product product,@RequestHeader String jwt) {
       Long sellerId =JwtUtil.verifySeller(jwt);
    	if( sellerId !=null) {
     		   productService.addProduct(product);
    	
    		return ResponseEntity.ok("Product Added SuccessFully");
        }else {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
        	
        }
        
        
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product) {
        // Add logic for updating an existing product
    	Product updatedProduct = productService.updateProduct(productId, product);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId,@RequestHeader String jwt) {
       
    	Long sellerId =JwtUtil.verifySeller(jwt);
    	if( sellerId !=null) {
    		
    		productService.deleteProduct(productId);
    		return ResponseEntity.ok("Product Deleted SuccessFully");
        }else {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
        	
        }
    }

    // Other ProductController methods
}

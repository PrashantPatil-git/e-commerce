package com.bookcharm.app.service;

import com.bookcharm.app.model.Order;
import com.bookcharm.app.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
	
	
	

    @Autowired
    private OrderRepository orderRepository;
    
    
    @Override
    public Order getOrderById(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        return optionalOrder.orElse(null);
    }

    @Override
    public Order createOrder(Order order) {
        // Add logic for order creation, validation, etc.
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Long orderId, Order updatedOrder) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order existingOrder = optionalOrder.get();
            // Update the existing order with the new information
            existingOrder.setOrderStatus(updatedOrder.getOrderStatus());
            existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
            existingOrder.setOrderDate(updatedOrder.getOrderDate().toString());
            existingOrder.setQuantity(updatedOrder.getQuantity());

            // Save and return the updated order
            return orderRepository.save(existingOrder);
        }
        return null;
    }

    @Override
    public boolean deleteOrder(Long orderId) {
        if (orderRepository.existsById(orderId)) {
            orderRepository.deleteById(orderId);
            return true;
        }
        return false;
    }

    // Add other OrderService methods if needed
}

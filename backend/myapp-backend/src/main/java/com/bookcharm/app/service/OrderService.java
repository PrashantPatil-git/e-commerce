package com.bookcharm.app.service;

import com.bookcharm.app.model.Order;

public interface OrderService {
    Order getOrderById(Long orderId);
    Order createOrder(Order order);
    Order updateOrder(Long orderId, Order order);
    boolean deleteOrder(Long orderId);
    // Other OrderService methods
}

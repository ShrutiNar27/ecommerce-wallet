package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.OrderResponseDTO;
import com.shruti.ecommerce.wallet.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public OrderResponseDTO checkout() {
        return orderService.checkout();
    }

    @GetMapping
    public List<OrderResponseDTO> getMyOrders() {
        return orderService.getMyOrders();
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }
}

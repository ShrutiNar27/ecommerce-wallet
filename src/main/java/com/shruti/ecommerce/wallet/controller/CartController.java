package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.CartResponseDTO;
import com.shruti.ecommerce.wallet.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add/{productId}")
    public CartResponseDTO addToCart(@PathVariable Long productId) {
        return cartService.addToCart(productId);
    }
}
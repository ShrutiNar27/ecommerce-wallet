package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.CartUpdateRequestDTO;
import jakarta.validation.Valid;
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

    @GetMapping
    public CartResponseDTO getCart() {
        return cartService.getCart();
    }

    @PutMapping("/update/{productId}")
    public CartResponseDTO updateCartItem(
            @PathVariable Long productId,
            @Valid @RequestBody CartUpdateRequestDTO requestDTO) {

        return cartService.updateCartItem(productId, requestDTO);
    }

    @DeleteMapping("/remove/{productId}")
    public String removeFromCart(@PathVariable Long productId) {

        return cartService.removeFromCart(productId);
    }

    @DeleteMapping("/clear")
    public String clearCart() {

        return cartService.clearCart();
    }
}
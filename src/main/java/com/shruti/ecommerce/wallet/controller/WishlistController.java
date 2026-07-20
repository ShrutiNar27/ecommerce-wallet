package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.WishlistResponseDTO;
import com.shruti.ecommerce.wallet.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<WishlistResponseDTO> addToWishlist(
            @PathVariable Long productId) {

        return ResponseEntity.ok(wishlistService.addToWishlist(productId));
    }

    @GetMapping
    public ResponseEntity<WishlistResponseDTO> getWishlist() {

        return ResponseEntity.ok(wishlistService.getWishlist());
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<WishlistResponseDTO> removeFromWishlist(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                wishlistService.removeFromWishlist(productId)
        );
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearWishlist() {

        wishlistService.clearWishlist();

        return ResponseEntity.ok("Wishlist cleared successfully");
    }
}

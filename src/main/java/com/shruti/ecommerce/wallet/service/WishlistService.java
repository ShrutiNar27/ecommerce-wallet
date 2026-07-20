package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.WishlistItemResponseDTO;
import com.shruti.ecommerce.wallet.dto.WishlistResponseDTO;
import com.shruti.ecommerce.wallet.model.*;
import com.shruti.ecommerce.wallet.repository.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public WishlistService(WishlistRepository wishlistRepository,
                           WishlistItemRepository wishlistItemRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {

        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public WishlistResponseDTO addToWishlist(Long productId) {

        User user = getLoggedInUser();

        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseGet(() -> {
                    Wishlist newWishlist = Wishlist.builder()
                            .user(user)
                            .build();

                    return wishlistRepository.save(newWishlist);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        WishlistItem wishlistItem = wishlistItemRepository
                .findByWishlistAndProduct(wishlist, product)
                .orElse(null);

        if (wishlistItem != null) {
            throw new RuntimeException("Product already exists in wishlist");
        }

        wishlistItem = WishlistItem.builder()
                .wishlist(wishlist)
                .product(product)
                .build();

        wishlist.getWishlistItems().add(wishlistItem);

        wishlistItemRepository.save(wishlistItem);

        Wishlist updatedWishlist = wishlistRepository.findById(wishlist.getId())
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        return buildWishlistResponse(updatedWishlist);
    }

    private WishlistResponseDTO buildWishlistResponse(Wishlist wishlist) {

        return WishlistResponseDTO.builder()
                .wishlistId(wishlist.getId())
                .items(
                        wishlist.getWishlistItems()
                                .stream()
                                .map(item -> WishlistItemResponseDTO.builder()
                                        .productId(item.getProduct().getId())
                                        .productName(item.getProduct().getName())
                                        .price(item.getProduct().getPrice())
                                        .build())
                                .toList()
                )
                .build();
    }

    public WishlistResponseDTO getWishlist() {

        User user = getLoggedInUser();

        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseGet(() -> {
                    Wishlist newWishlist = Wishlist.builder()
                            .user(user)
                            .build();

                    return wishlistRepository.save(newWishlist);
                });

        return buildWishlistResponse(wishlist);
    }

    public WishlistResponseDTO removeFromWishlist(Long productId) {

        User user = getLoggedInUser();

        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        WishlistItem wishlistItem = wishlistItemRepository
                .findByWishlistAndProduct(wishlist, product)
                .orElseThrow(() -> new RuntimeException("Product not found in wishlist"));

        wishlist.getWishlistItems().remove(wishlistItem);

        wishlistItemRepository.delete(wishlistItem);

        return buildWishlistResponse(wishlist);
    }

    public void clearWishlist() {

        User user = getLoggedInUser();

        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        wishlist.getWishlistItems().clear();

        wishlistRepository.save(wishlist);
    }

}
package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.CartItemResponseDTO;
import com.shruti.ecommerce.wallet.dto.CartResponseDTO;
import com.shruti.ecommerce.wallet.exception.ProductNotFoundException;
import com.shruti.ecommerce.wallet.model.Cart;
import com.shruti.ecommerce.wallet.model.CartItem;
import com.shruti.ecommerce.wallet.model.Product;
import com.shruti.ecommerce.wallet.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.shruti.ecommerce.wallet.repository.CartItemRepository;
import com.shruti.ecommerce.wallet.repository.CartRepository;
import com.shruti.ecommerce.wallet.repository.ProductRepository;
import com.shruti.ecommerce.wallet.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
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

    public CartResponseDTO addToCart(Long productId) {

        User user = getLoggedInUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();

                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        CartItem cartItem = cartItemRepository
                .findByCartAndProduct(cart, product)
                .orElse(null);

        if (cartItem != null) {

            cartItem.setQuantity(cartItem.getQuantity() + 1);

            cartItem.setSubtotal(
                    cartItem.getQuantity() * product.getPrice());

        }

        else {

            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(1)
                    .subtotal(product.getPrice())
                    .build();
            cart.getCartItems().add(cartItem);
        }

        cartItemRepository.save(cartItem);

        Cart updatedCart = cartRepository.findById(cart.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        double totalAmount = updatedCart.getCartItems()
                .stream()
                .mapToDouble(CartItem::getSubtotal)
                .sum();

        return CartResponseDTO.builder()
                .cartId(updatedCart.getId())
                .items(updatedCart.getCartItems()
                        .stream()
                        .map(item -> CartItemResponseDTO.builder()
                                .productId(item.getProduct().getId())
                                .productName(item.getProduct().getName())
                                .quantity(item.getQuantity())
                                .price(item.getProduct().getPrice())
                                .subtotal(item.getSubtotal())
                                .build())
                        .toList())
                .totalAmount(totalAmount)
                .build();
    }
}

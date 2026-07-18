package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Cart;
import com.shruti.ecommerce.wallet.model.CartItem;
import com.shruti.ecommerce.wallet.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

}
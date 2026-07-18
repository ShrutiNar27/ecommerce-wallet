package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Cart;
import com.shruti.ecommerce.wallet.model.CartItem;
import com.shruti.ecommerce.wallet.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.cart = :cart")
    void deleteAllByCart(Cart cart);
}
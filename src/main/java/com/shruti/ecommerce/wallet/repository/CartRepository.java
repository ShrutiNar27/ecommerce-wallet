package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Cart;
import com.shruti.ecommerce.wallet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUser(User user);

}
package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.User;
import com.shruti.ecommerce.wallet.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Optional<Wishlist> findByUser(User user);

}
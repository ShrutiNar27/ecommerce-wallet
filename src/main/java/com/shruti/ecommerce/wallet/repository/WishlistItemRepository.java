package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Product;
import com.shruti.ecommerce.wallet.model.Wishlist;
import com.shruti.ecommerce.wallet.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    Optional<WishlistItem> findByWishlistAndProduct(Wishlist wishlist, Product product);

}

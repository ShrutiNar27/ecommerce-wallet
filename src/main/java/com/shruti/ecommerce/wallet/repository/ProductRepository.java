package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
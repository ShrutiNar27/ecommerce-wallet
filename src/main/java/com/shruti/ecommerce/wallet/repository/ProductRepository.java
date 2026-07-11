package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);

    List<Product> findByPriceGreaterThan(Double price);

    List<Product> findByNameContaining(String keyword);

    @Query("SELECT p FROM Product p WHERE p.name = :name")
    List<Product> getProductsByName(@Param("name") String name);

    @Query("SELECT p FROM Product p WHERE p.price > :price")
    List<Product> getExpensiveProducts(@Param("price") Double price);
}
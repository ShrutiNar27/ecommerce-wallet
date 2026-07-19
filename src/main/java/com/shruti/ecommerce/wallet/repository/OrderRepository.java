package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Order;
import com.shruti.ecommerce.wallet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
}
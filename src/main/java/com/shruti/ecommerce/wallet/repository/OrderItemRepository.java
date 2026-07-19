package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
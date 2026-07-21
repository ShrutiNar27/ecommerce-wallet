package com.shruti.ecommerce.wallet.dto;

import com.shruti.ecommerce.wallet.model.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDTO {

    private Long orderId;

    private LocalDateTime orderDate;

    private OrderStatus status;

    private Double totalAmount;

    private List<OrderItemResponseDTO> items;
}
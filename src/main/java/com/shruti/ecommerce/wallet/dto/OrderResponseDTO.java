package com.shruti.ecommerce.wallet.dto;

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

    private String status;

    private Double totalAmount;

    private List<OrderItemResponseDTO> items;
}
package com.shruti.ecommerce.wallet.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDTO {

    private Long cartId;

    private List<CartItemResponseDTO> items;

    private Double totalAmount;
}
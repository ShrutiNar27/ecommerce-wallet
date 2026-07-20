package com.shruti.ecommerce.wallet.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistResponseDTO {

    private Long wishlistId;
    private List<WishlistItemResponseDTO> items;
}

package com.shruti.ecommerce.wallet.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayWithWalletRequestDTO {

    @NotNull
    private Long orderId;

}
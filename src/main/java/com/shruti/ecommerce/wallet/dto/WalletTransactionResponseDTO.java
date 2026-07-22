package com.shruti.ecommerce.wallet.dto;

import com.shruti.ecommerce.wallet.model.WalletTransactionType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalletTransactionResponseDTO {

    private Double amount;

    private WalletTransactionType type;

    private String description;

    private LocalDateTime createdAt;
}
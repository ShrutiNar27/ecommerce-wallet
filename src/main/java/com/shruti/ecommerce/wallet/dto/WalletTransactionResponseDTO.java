package com.shruti.ecommerce.wallet.dto;

import com.shruti.ecommerce.wallet.model.TransactionType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalletTransactionResponseDTO {

    private Double amount;

    private TransactionType type;

    private String description;

    private LocalDateTime createdAt;
}
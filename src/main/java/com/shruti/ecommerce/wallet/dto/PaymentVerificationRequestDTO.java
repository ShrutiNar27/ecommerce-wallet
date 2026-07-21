package com.shruti.ecommerce.wallet.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentVerificationRequestDTO {

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;
}

package com.shruti.ecommerce.wallet.dto;

import com.shruti.ecommerce.wallet.model.PaymentStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {

    private Long paymentId;

    private Long orderId;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private Double amount;

    private PaymentStatus status;

    private String paymentMethod;

}

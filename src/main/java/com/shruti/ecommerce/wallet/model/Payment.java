package com.shruti.ecommerce.wallet.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String paymentMethod;

    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "order_id", unique = true)
    private Order order;
}
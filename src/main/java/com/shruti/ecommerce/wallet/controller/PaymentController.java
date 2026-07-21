package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.PaymentRequestDTO;
import com.shruti.ecommerce.wallet.dto.PaymentResponseDTO;
import com.shruti.ecommerce.wallet.dto.PaymentVerificationRequestDTO;
import com.shruti.ecommerce.wallet.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public ResponseEntity<PaymentResponseDTO> createPayment(
            @RequestBody PaymentRequestDTO request) throws Exception {

        return ResponseEntity.ok(
                paymentService.createPayment(request.getOrderId())
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<PaymentResponseDTO> verifyPayment(
            @RequestBody PaymentVerificationRequestDTO request) throws Exception {

        return ResponseEntity.ok(
                paymentService.verifyPayment(request)
        );
    }
}

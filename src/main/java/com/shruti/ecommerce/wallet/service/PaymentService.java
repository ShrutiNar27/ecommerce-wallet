package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.PaymentVerificationRequestDTO;
import com.shruti.ecommerce.wallet.model.*;
import org.json.JSONObject;
import java.time.LocalDateTime;
import com.shruti.ecommerce.wallet.dto.PaymentResponseDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.razorpay.RazorpayClient;
import com.shruti.ecommerce.wallet.repository.OrderRepository;
import com.shruti.ecommerce.wallet.repository.PaymentRepository;
import com.shruti.ecommerce.wallet.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RazorpayClient razorpayClient;

    public PaymentService(PaymentRepository paymentRepository,
                          OrderRepository orderRepository,
                          UserRepository userRepository,
                          RazorpayClient razorpayClient) {

        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.razorpayClient = razorpayClient;
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private PaymentResponseDTO buildPaymentResponse(Payment payment) {

        return PaymentResponseDTO.builder()
                .paymentId(payment.getId())
                .orderId(payment.getOrder().getId())
                .razorpayOrderId(payment.getRazorpayOrderId())
                .razorpayPaymentId(payment.getRazorpayPaymentId())
                .amount(payment.getAmount())
                .status(payment.getStatus())
                .paymentMethod(payment.getPaymentMethod())
                .build();
    }

    public PaymentResponseDTO createPayment(Long orderId) throws Exception {

        User user = getLoggedInUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot pay for this order");
        }

        if (paymentRepository.findByOrder(order).isPresent()) {
            throw new RuntimeException("Payment already exists for this order");
        }

        JSONObject options = new JSONObject();

        options.put("amount", (int) (order.getTotalAmount() * 100));
        options.put("currency", "INR");
        options.put("receipt", "order_" + order.getId());

        com.razorpay.Order razorpayOrder =
                razorpayClient.orders.create(options);

        Payment payment = Payment.builder()
                .order(order)
                .razorpayOrderId(razorpayOrder.get("id"))
                .amount(order.getTotalAmount())
                .status(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        return buildPaymentResponse(savedPayment);
    }

    public PaymentResponseDTO verifyPayment(
            PaymentVerificationRequestDTO request) {

        Payment payment = paymentRepository
                .findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setStatus(PaymentStatus.SUCCESS);

        Payment updatedPayment = paymentRepository.save(payment);

        Order order = payment.getOrder();

        order.setStatus(OrderStatus.PAID);

        orderRepository.save(order);

        return buildPaymentResponse(updatedPayment);
    }
}
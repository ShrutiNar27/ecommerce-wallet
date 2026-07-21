package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.OrderItemResponseDTO;
import com.shruti.ecommerce.wallet.dto.OrderResponseDTO;
import com.shruti.ecommerce.wallet.model.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.shruti.ecommerce.wallet.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        CartRepository cartRepository,
                        CartItemRepository cartItemRepository,
                        UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public OrderResponseDTO checkout() {

        User user = getLoggedInUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PLACED)
                .totalAmount(0.0)
                .build();

        order = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();

        double totalAmount = 0.0;

        for (CartItem cartItem : cart.getCartItems()) {

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getPrice())
                    .subtotal(cartItem.getSubtotal())
                    .build();

            orderItems.add(orderItem);

            totalAmount += cartItem.getSubtotal();
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        order = orderRepository.save(order);


        for (CartItem item : new ArrayList<>(cart.getCartItems())) {
            item.setCart(null);
        }

        cart.getCartItems().clear();

        cartRepository.save(cart);


        return buildOrderResponse(order);
    }

    private OrderResponseDTO buildOrderResponse(Order order) {

        List<OrderItemResponseDTO> items = order.getOrderItems()
                .stream()
                .map(item -> OrderItemResponseDTO.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .subtotal(item.getSubtotal())
                        .build())
                .toList();

        return OrderResponseDTO.builder()
                .orderId(order.getId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .totalAmount(order.getTotalAmount())
                .items(items)
                .build();
    }

    public List<OrderResponseDTO> getMyOrders() {

        User user = getLoggedInUser();

        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream()
                .map(this::buildOrderResponse)
                .toList();
    }
}
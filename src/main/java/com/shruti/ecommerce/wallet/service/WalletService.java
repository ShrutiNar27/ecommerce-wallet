package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.PayWithWalletRequestDTO;
import com.shruti.ecommerce.wallet.model.Order;
import com.shruti.ecommerce.wallet.model.OrderStatus;
import com.shruti.ecommerce.wallet.repository.OrderRepository;
import com.shruti.ecommerce.wallet.dto.WalletTransactionResponseDTO;
import com.shruti.ecommerce.wallet.dto.WithdrawRequestDTO;
import com.shruti.ecommerce.wallet.model.WalletTransactionType;
import com.shruti.ecommerce.wallet.model.WalletTransaction;
import java.time.LocalDateTime;
import java.util.List;
import com.shruti.ecommerce.wallet.dto.DepositRequestDTO;
import com.shruti.ecommerce.wallet.dto.WalletResponseDTO;
import com.shruti.ecommerce.wallet.model.User;
import com.shruti.ecommerce.wallet.model.Wallet;
import com.shruti.ecommerce.wallet.repository.UserRepository;
import com.shruti.ecommerce.wallet.repository.WalletRepository;
import com.shruti.ecommerce.wallet.repository.WalletTransactionRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;
    private final WalletTransactionRepository walletTransactionRepository;
    private final OrderRepository orderRepository;

    public WalletService(
            WalletRepository walletRepository,
            WalletTransactionRepository walletTransactionRepository,
            UserRepository userRepository,
            OrderRepository orderRepository
    ) {

        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
        this.walletTransactionRepository = walletTransactionRepository;
        this.orderRepository = orderRepository;
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public WalletResponseDTO getWallet() {

        User user = getLoggedInUser();

        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        return WalletResponseDTO.builder()
                .walletId(wallet.getId())
                .balance(wallet.getBalance())
                .userId(user.getId())
                .build();
    }

    public WalletResponseDTO depositMoney(DepositRequestDTO requestDTO) {

        User user = getLoggedInUser();

        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        wallet.setBalance(wallet.getBalance() + requestDTO.getAmount());

        Wallet updatedWallet = walletRepository.save(wallet);

        WalletTransaction transaction = WalletTransaction.builder()
                .wallet(updatedWallet)
                .amount(requestDTO.getAmount())
                .type(WalletTransactionType.DEPOSIT)
                .description("Wallet Recharge")
                .createdAt(LocalDateTime.now())
                .build();

        walletTransactionRepository.save(transaction);

        return WalletResponseDTO.builder()
                .walletId(updatedWallet.getId())
                .balance(updatedWallet.getBalance())
                .userId(user.getId())
                .build();
    }

    public WalletResponseDTO withdrawMoney(WithdrawRequestDTO requestDTO) {

        User user = getLoggedInUser();

        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        if (wallet.getBalance() < requestDTO.getAmount()) {
            throw new RuntimeException("Insufficient wallet balance");
        }

        wallet.setBalance(wallet.getBalance() - requestDTO.getAmount());

        Wallet updatedWallet = walletRepository.save(wallet);

        WalletTransaction transaction = WalletTransaction.builder()
                .wallet(updatedWallet)
                .amount(requestDTO.getAmount())
                .type(WalletTransactionType.WITHDRAW)
                .description("Wallet Withdrawal")
                .createdAt(LocalDateTime.now())
                .build();

        walletTransactionRepository.save(transaction);

        return WalletResponseDTO.builder()
                .walletId(updatedWallet.getId())
                .balance(updatedWallet.getBalance())
                .userId(user.getId())
                .build();
    }

    public List<WalletTransactionResponseDTO> getTransactions() {

        User user = getLoggedInUser();

        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        List<WalletTransaction> transactions =
                walletTransactionRepository.findByWallet(wallet);

        return transactions.stream()
                .map(transaction -> WalletTransactionResponseDTO.builder()
                        .amount(transaction.getAmount())
                        .type(transaction.getType())
                        .description(transaction.getDescription())
                        .createdAt(transaction.getCreatedAt())
                        .build())
                .toList();
    }

    public WalletResponseDTO payWithWallet(PayWithWalletRequestDTO requestDTO) {

        User user = getLoggedInUser();

        Order order = orderRepository.findById(requestDTO.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot pay for another user's order");
        }

        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        if (wallet.getBalance() < order.getTotalAmount()) {
            throw new RuntimeException("Insufficient wallet balance");
        }

        wallet.setBalance(wallet.getBalance() - order.getTotalAmount());
        walletRepository.save(wallet);

        WalletTransaction transaction = WalletTransaction.builder()
                .wallet(wallet)
                .amount(order.getTotalAmount())
                .type(WalletTransactionType.PAYMENT)
                .description("Order Payment")
                .build();

        walletTransactionRepository.save(transaction);

        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);

        return WalletResponseDTO.builder()
                .walletId(wallet.getId())
                .balance(wallet.getBalance())
                .userId(user.getId())
                .build();
    }
}

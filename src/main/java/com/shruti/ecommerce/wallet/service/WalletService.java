package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.WalletTransactionResponseDTO;
import com.shruti.ecommerce.wallet.dto.WithdrawRequestDTO;
import com.shruti.ecommerce.wallet.model.TransactionType;
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

    public WalletService(WalletRepository walletRepository,
                         UserRepository userRepository,
                         WalletTransactionRepository walletTransactionRepository) {

        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
        this.walletTransactionRepository = walletTransactionRepository;
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
                .type(TransactionType.DEPOSIT)
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
                .type(TransactionType.WITHDRAW)
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

}

package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.WalletResponseDTO;
import com.shruti.ecommerce.wallet.model.User;
import com.shruti.ecommerce.wallet.model.Wallet;
import com.shruti.ecommerce.wallet.repository.UserRepository;
import com.shruti.ecommerce.wallet.repository.WalletRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public WalletService(WalletRepository walletRepository,
                         UserRepository userRepository) {

        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
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

}

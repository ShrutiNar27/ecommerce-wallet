package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.DepositRequestDTO;
import com.shruti.ecommerce.wallet.dto.WalletResponseDTO;
import com.shruti.ecommerce.wallet.dto.WalletTransactionResponseDTO;
import com.shruti.ecommerce.wallet.service.WalletService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping
    public ResponseEntity<WalletResponseDTO> getWallet() {
        return ResponseEntity.ok(walletService.getWallet());
    }

    @PostMapping("/deposit")
    public ResponseEntity<WalletResponseDTO> depositMoney(
            @RequestBody @Valid DepositRequestDTO requestDTO) {

        return ResponseEntity.ok(walletService.depositMoney(requestDTO));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<WalletTransactionResponseDTO>> getTransactions() {

        return ResponseEntity.ok(walletService.getTransactions());
    }
}

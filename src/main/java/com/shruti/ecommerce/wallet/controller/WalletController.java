package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.WalletResponseDTO;
import com.shruti.ecommerce.wallet.service.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}

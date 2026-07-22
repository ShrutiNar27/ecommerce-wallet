package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Wallet;
import com.shruti.ecommerce.wallet.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository
        extends JpaRepository<WalletTransaction, Long> {

    List<WalletTransaction> findByWallet(Wallet wallet);

}

package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.User;
import com.shruti.ecommerce.wallet.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

    Optional<Wallet> findByUser(User user);


}
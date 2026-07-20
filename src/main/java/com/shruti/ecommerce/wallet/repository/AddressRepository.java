package com.shruti.ecommerce.wallet.repository;

import com.shruti.ecommerce.wallet.model.Address;
import com.shruti.ecommerce.wallet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUser(User user);

    Optional<Address> findByIdAndUser(Long id, User user);

    Optional<Address> findByUserAndIsDefaultTrue(User user);
}
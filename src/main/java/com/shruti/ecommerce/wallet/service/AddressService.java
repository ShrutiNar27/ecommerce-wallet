package com.shruti.ecommerce.wallet.service;

import java.util.List;
import com.shruti.ecommerce.wallet.dto.AddressRequestDTO;
import com.shruti.ecommerce.wallet.dto.AddressResponseDTO;
import com.shruti.ecommerce.wallet.model.Address;
import com.shruti.ecommerce.wallet.model.User;
import com.shruti.ecommerce.wallet.repository.AddressRepository;
import com.shruti.ecommerce.wallet.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(AddressRepository addressRepository,
                          UserRepository userRepository) {

        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private AddressResponseDTO buildAddressResponse(Address address) {

        return AddressResponseDTO.builder()
                .id(address.getId())
                .fullName(address.getFullName())
                .phoneNumber(address.getPhoneNumber())
                .addressLine1(address.getAddressLine1())
                .addressLine2(address.getAddressLine2())
                .city(address.getCity())
                .state(address.getState())
                .country(address.getCountry())
                .postalCode(address.getPostalCode())
                .isDefault(address.isDefault())
                .build();
    }

    public AddressResponseDTO addAddress(AddressRequestDTO request) {

        User user = getLoggedInUser();

        boolean isFirstAddress = addressRepository.findByUser(user).isEmpty();

        Address address = Address.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .addressLine1(request.getAddressLine1())
                .addressLine2(request.getAddressLine2())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .postalCode(request.getPostalCode())
                .isDefault(isFirstAddress)
                .user(user)
                .build();

        Address savedAddress = addressRepository.save(address);

        return buildAddressResponse(savedAddress);
    }

    public List<AddressResponseDTO> getAllAddresses() {

        User user = getLoggedInUser();

        List<Address> addresses = addressRepository.findByUser(user);

        return addresses.stream()
                .map(this::buildAddressResponse)
                .toList();
    }

    public AddressResponseDTO getAddressById(Long id) {

        User user = getLoggedInUser();

        Address address = addressRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        return buildAddressResponse(address);
    }

    public AddressResponseDTO updateAddress(Long id, AddressRequestDTO request) {

        User user = getLoggedInUser();

        Address address = addressRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setFullName(request.getFullName());
        address.setPhoneNumber(request.getPhoneNumber());
        address.setAddressLine1(request.getAddressLine1());
        address.setAddressLine2(request.getAddressLine2());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setCountry(request.getCountry());
        address.setPostalCode(request.getPostalCode());

        Address updatedAddress = addressRepository.save(address);

        return buildAddressResponse(updatedAddress);
    }

    public void deleteAddress(Long id) {

        User user = getLoggedInUser();

        Address address = addressRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        boolean wasDefault = address.isDefault();

        addressRepository.delete(address);

        if (wasDefault) {

            List<Address> remainingAddresses = addressRepository.findByUser(user);

            if (!remainingAddresses.isEmpty()) {

                Address newDefault = remainingAddresses.get(0);

                newDefault.setDefault(true);

                addressRepository.save(newDefault);
            }
        }
    }

    public AddressResponseDTO setDefaultAddress(Long id) {

        User user = getLoggedInUser();

        Address newDefault = addressRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        addressRepository.findByUserAndIsDefaultTrue(user)
                .ifPresent(address -> {
                    address.setDefault(false);
                    addressRepository.save(address);
                });

        newDefault.setDefault(true);

        Address updatedAddress = addressRepository.save(newDefault);

        return buildAddressResponse(updatedAddress);
    }
}

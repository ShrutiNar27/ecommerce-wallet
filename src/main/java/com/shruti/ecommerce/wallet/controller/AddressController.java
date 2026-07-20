package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.AddressRequestDTO;
import com.shruti.ecommerce.wallet.dto.AddressResponseDTO;
import com.shruti.ecommerce.wallet.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity<AddressResponseDTO> addAddress(
            @Valid @RequestBody AddressRequestDTO request) {

        return ResponseEntity.ok(addressService.addAddress(request));
    }

    @GetMapping
    public ResponseEntity<List<AddressResponseDTO>> getAllAddresses() {

        return ResponseEntity.ok(addressService.getAllAddresses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> getAddressById(
            @PathVariable Long id) {

        return ResponseEntity.ok(addressService.getAddressById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> updateAddress(
            @PathVariable Long id,
            @Valid @RequestBody AddressRequestDTO request) {

        return ResponseEntity.ok(addressService.updateAddress(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAddress(
            @PathVariable Long id) {

        addressService.deleteAddress(id);

        return ResponseEntity.ok("Address deleted successfully");
    }

    @PatchMapping("/default/{id}")
    public ResponseEntity<AddressResponseDTO> setDefaultAddress(
            @PathVariable Long id) {

        return ResponseEntity.ok(addressService.setDefaultAddress(id));
    }
}
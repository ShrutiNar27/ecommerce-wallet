package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.*;
import com.shruti.ecommerce.wallet.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(
            @Valid @RequestBody UserRequestDTO requestDTO) {

        UserResponseDTO responseDTO =
                userService.registerUser(requestDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO requestDTO){

        LoginResponseDTO response =
                userService.login(requestDTO);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refreshToken(
            @RequestBody RefreshRequestDTO requestDTO) {

        LoginResponseDTO response =
                userService.refreshToken(requestDTO);

        return ResponseEntity.ok(response);
    }
}
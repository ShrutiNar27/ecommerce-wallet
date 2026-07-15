package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.LoginRequestDTO;
import com.shruti.ecommerce.wallet.dto.LoginResponseDTO;
import com.shruti.ecommerce.wallet.dto.UserRequestDTO;
import com.shruti.ecommerce.wallet.dto.UserResponseDTO;
import com.shruti.ecommerce.wallet.service.UserService;
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
            @RequestBody UserRequestDTO requestDTO) {

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
}
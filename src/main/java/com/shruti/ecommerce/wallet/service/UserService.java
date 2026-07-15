package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.LoginRequestDTO;
import com.shruti.ecommerce.wallet.dto.LoginResponseDTO;
import com.shruti.ecommerce.wallet.dto.UserRequestDTO;
import com.shruti.ecommerce.wallet.dto.UserResponseDTO;
import com.shruti.ecommerce.wallet.model.User;
import com.shruti.ecommerce.wallet.repository.UserRepository;
import com.shruti.ecommerce.wallet.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserResponseDTO registerUser(UserRequestDTO requestDTO) {

        User user = User.builder()
                .name(requestDTO.getName())
                .email(requestDTO.getEmail())
                .password(passwordEncoder.encode(requestDTO.getPassword()))
                .build();

        User savedUser = userRepository.save(user);

        return UserResponseDTO.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .build();
    }

    public LoginResponseDTO login(LoginRequestDTO requestDTO) {

        User user = userRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password"));

        boolean matches = passwordEncoder.matches(
                requestDTO.getPassword(),
                user.getPassword());

        if (!matches) {
            throw new RuntimeException("Invalid Email or Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return LoginResponseDTO.builder()
                .token(token)
                .build();
    }
}
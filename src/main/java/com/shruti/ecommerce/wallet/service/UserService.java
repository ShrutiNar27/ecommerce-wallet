package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.model.Wallet;
import com.shruti.ecommerce.wallet.dto.*;
import com.shruti.ecommerce.wallet.model.User;
import com.shruti.ecommerce.wallet.repository.UserRepository;
import com.shruti.ecommerce.wallet.repository.WalletRepository;
import com.shruti.ecommerce.wallet.security.CustomUserDetailsService;
import com.shruti.ecommerce.wallet.security.JwtService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       CustomUserDetailsService customUserDetailsService,
                       WalletRepository walletRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
        this.walletRepository = walletRepository;
    }


    public UserResponseDTO registerUser(UserRequestDTO requestDTO) {

        User user = User.builder()
                .name(requestDTO.getName())
                .email(requestDTO.getEmail())
                .password(passwordEncoder.encode(requestDTO.getPassword()))
                .role("USER")
                .build();

        User savedUser = userRepository.save(user);

        Wallet wallet = Wallet.builder()
                .user(savedUser)
                .balance(0.0)
                .build();

        walletRepository.save(wallet);

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

        String accessToken =
                jwtService.generateAccessToken(user.getEmail());

        String refreshToken =
                jwtService.generateRefreshToken(user.getEmail());

        return LoginResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public LoginResponseDTO refreshToken(
            RefreshRequestDTO requestDTO) {

        String refreshToken = requestDTO.getRefreshToken();

        String email = jwtService.extractUsername(refreshToken);

        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(email);

        if (!jwtService.validateToken(refreshToken, userDetails)) {
            throw new RuntimeException("Invalid Refresh Token");
        }

        String newAccessToken =
                jwtService.generateAccessToken(email);

        return LoginResponseDTO.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .build();
    }
}

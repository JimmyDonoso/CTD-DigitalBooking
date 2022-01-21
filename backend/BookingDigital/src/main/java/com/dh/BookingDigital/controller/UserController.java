package com.dh.BookingDigital.controller;

import com.dh.BookingDigital.model.User;
import com.dh.BookingDigital.security.UserLoginDto;
import com.dh.BookingDigital.service.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserServiceImpl userService;
    private final AuthenticationManager authenticationManager;

    public UserController(UserServiceImpl userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@Valid @RequestBody User newUser){
        userService.save(newUser);
        return ResponseEntity.ok("Usuario agregado correctamente");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(user.getEmail(),
                user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Optional<UserLoginDto> userLoginDto = userService.login(user);

        return userLoginDto.isPresent() ? ResponseEntity.ok(userLoginDto.get()) : ResponseEntity.badRequest().build();
    }

    @GetMapping("/searchByMail/{mail}")
    public ResponseEntity<?> findByMail(@PathVariable String mail){
        return ResponseEntity.ok(userService.searchByEmail(mail));
    }
}

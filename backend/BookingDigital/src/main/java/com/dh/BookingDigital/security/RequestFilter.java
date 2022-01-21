package com.dh.BookingDigital.security;

import com.dh.BookingDigital.model.User;
import com.dh.BookingDigital.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class RequestFilter extends OncePerRequestFilter {
    private TokenService tokenService;
    private UserServiceImpl userService;

    public RequestFilter(TokenService tokenService, UserServiceImpl userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        String token = request.getHeader("Authorization");

        if ((path.contains("/booking") || path.contains("/products/add")) && token != null && !token.isEmpty()) {
            UserTokenDto userTokenDto = null;

            try {
                userTokenDto = tokenService.decodeToken(token);
            } catch (Exception e) {
                System.out.println("token no válido");
            }

            if (userTokenDto != null) {
                Optional<User> userOptional = userService.searchByEmail(userTokenDto.getEmail());

                if (LocalDateTime.now().isBefore(userTokenDto.getDateTime()) && userOptional.isPresent()) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userOptional.get().getEmail(),
                                    userOptional.get().getPassword(), userOptional.get().getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        }
        filterChain.doFilter(request, httpServletResponse);
    }
}

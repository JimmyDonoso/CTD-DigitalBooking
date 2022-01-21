package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.Rol;
import com.dh.BookingDigital.model.User;
import com.dh.BookingDigital.repository.IUserRepository;
import com.dh.BookingDigital.security.PasswordEncoder;
import com.dh.BookingDigital.security.TokenService;
import com.dh.BookingDigital.security.UserLoginDto;
import com.dh.BookingDigital.security.UserTokenDto;
import com.dh.BookingDigital.service.inter.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService<User>, UserDetailsService {
    private final IUserRepository userRepository;
    private final TokenService tokenService;
    private final RolServiceImpl rolService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(IUserRepository userRepository, TokenService tokenService, RolServiceImpl rolService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.rolService = rolService;
    }

    @Override
    public User save(User user){
        if(userRepository.findByEmail(user.getEmail()).isEmpty()){
            if(user.getRol() == null){
                if(rolService.findByName("USER").isEmpty()){
                    rolService.save(new Rol("USER"));
                }
                user.setRol(rolService.findByName("USER").get());
            }
            user.setPassword(passwordEncoder.encoder().encode(user.getPassword()));
            return userRepository.save(user);
        }
        return null;
    }
    @Override
    public Optional<User> searchByEmail(String email){ return userRepository.findByEmail(email);}

    @Override
    public Optional<User> searchUserById(Integer id) { return userRepository.findById(id);}

    @Override
    public void delete(Integer id) {userRepository.deleteById(id);}

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).isPresent() ? userRepository.findByEmail(username).get() :
                null;
    }


    @Override
    public Optional<UserLoginDto> login (User user){
        User userOptional = userRepository.findByEmail(user.getEmail()).get();

        String token = tokenService.getToken(new UserTokenDto(userOptional.getId(), userOptional.getEmail()));

        return Optional.of(new UserLoginDto(userOptional.getId(),userOptional.getName(), userOptional.getLastName(), userOptional.getEmail(),token, userOptional.getRol().getName()));
    }

}

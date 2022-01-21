package com.dh.BookingDigital.service.inter;

import com.dh.BookingDigital.model.User;
import com.dh.BookingDigital.security.UserLoginDto;

import java.util.Optional;

public interface IUserService<T> {
     T save(T usuario);
     Optional<User> searchByEmail(String email);
     Optional<User> searchUserById(Integer id);
     void delete(Integer id);
     Optional<UserLoginDto> login(User user);
}

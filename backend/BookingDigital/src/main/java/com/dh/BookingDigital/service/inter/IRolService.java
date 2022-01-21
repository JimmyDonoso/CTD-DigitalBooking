package com.dh.BookingDigital.service.inter;

import com.dh.BookingDigital.model.Rol;
import com.dh.BookingDigital.repository.IRolRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface IRolService {
    Optional<Rol> save(Rol Rol);
    Optional<Rol> findByName(String name);
}

package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.Rol;
import com.dh.BookingDigital.repository.IRolRepository;
import com.dh.BookingDigital.service.inter.IRolService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RolServiceImpl implements IRolService {
    private IRolRepository rolRepository;

    public RolServiceImpl(IRolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Override
    public Optional<Rol> save(Rol Rol) {
        Optional<Rol> RolOptional = rolRepository.findByName(Rol.getName());
        if (RolOptional.isEmpty()) {
            return Optional.of(rolRepository.save(Rol));
        }
        return Optional.empty();
    }

    @Override
    public Optional<Rol> findByName(String name) {
        return rolRepository.findByName(name);
    }
}

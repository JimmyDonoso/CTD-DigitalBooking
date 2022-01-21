package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.City;
import com.dh.BookingDigital.repository.ICityRepository;
import com.dh.BookingDigital.service.inter.ICityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements ICityService<City> {
    private final ICityRepository cityRepository;

    public CityServiceImpl(ICityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public City save(City city){
        return cityRepository.save(city);
    }

    @Override
    public List<City> list(){
        return cityRepository.findAll();
    }

    @Override
    public Optional<City> searchById(Integer id){
        return cityRepository.findById(id);
    }
}

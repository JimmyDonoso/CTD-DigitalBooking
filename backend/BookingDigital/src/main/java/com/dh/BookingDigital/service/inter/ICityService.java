package com.dh.BookingDigital.service.inter;

import java.util.List;
import java.util.Optional;

public interface ICityService<City> {
    City save(City city);
    List<City> list();
    Optional<City> searchById(Integer id);
}

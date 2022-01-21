package com.dh.BookingDigital.service.inter;

import com.dh.BookingDigital.model.Favorites;
import com.dh.BookingDigital.model.User;

import java.util.List;
import java.util.Optional;

public interface IFavoriteService {
    Favorites save(Favorites favorites);
    List<Favorites> list();
    void delete(Integer id);
    Optional<Favorites> searchById(Integer id);
    List<Favorites> searchByUserId(Integer id);
}


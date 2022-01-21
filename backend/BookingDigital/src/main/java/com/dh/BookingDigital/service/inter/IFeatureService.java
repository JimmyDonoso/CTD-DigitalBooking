package com.dh.BookingDigital.service.inter;



import java.util.List;
import java.util.Optional;

public interface IFeatureService <T>{
    T save(T feature);
    List<T> list();
    Optional<T> searcheById(Integer id);
    void delete(Integer id);
}

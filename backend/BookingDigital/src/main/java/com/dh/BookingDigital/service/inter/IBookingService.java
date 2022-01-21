package com.dh.BookingDigital.service.inter;

import com.dh.BookingDigital.model.Booking;
import com.dh.BookingDigital.model.Product;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IBookingService <Booking>{
    Booking save(Booking booking);
    List<Booking> list();
    Optional<Booking> searchById(Integer id);
    List<Product> filterByDate(LocalDate initialDate, LocalDate endDate);
    Set<Booking> findByProductId(Integer id);
}

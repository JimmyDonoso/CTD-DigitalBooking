package com.dh.BookingDigital.repository;

import com.dh.BookingDigital.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE :initialDate < b.initialBooking AND :endDate < b.initialBooking OR " +
            ":initialDate > b.endBooking AND :endDate > b.endBooking")
    List<Booking> filterByDate(LocalDate initialDate, LocalDate endDate);

    List<Booking> findByProduct_IdAndEndBookingAfter(Integer id, LocalDate endBooking);

    @Query("FROM Booking b WHERE b.product.id = :id")
    Set<Booking> findByProductId(@Param("id") Integer id);

    List<Booking> findAllByProductIdAndInitialBookingBetweenOrEndBookingBetween
            (Integer id, LocalDate startDateTime1, LocalDate startDateTime2,
             LocalDate endDate1, LocalDate endDate2);

    @Query(value = "select * from booking where booking.producto_id = :id " +
            "and booking.initial_booking between :start and :end " +
            "or booking.end_booking between :start and :end",
                nativeQuery = true)
    List<Booking> findD(Integer id, LocalDate start, LocalDate end);
}

package com.dh.BookingDigital.repository;

import com.dh.BookingDigital.dto.ProductDto;
import com.dh.BookingDigital.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findAllProductsByCityCity(String city);
    List<Product> findAllProductsByCategoryTitle(String title);

//    SELECT * FROM productos p left join booking b on p.id = b.producto_id WHERE (b.id is null AND p.ciudad_id = 2) OR "2021-12-05" < b.initial_booking AND "2021-12-10" < b.initial_booking AND p.ciudad_id = 2 OR "2021-12-05" > b.end_booking AND "2021-12-10" > b.end_booking AND p.ciudad_id = 2
//    @Query("FROM Product p left join p.booking b on p.id = b.product.id WHERE (b.id is null AND p.city.city = :city) OR :initialDate < b.initialBooking AND :endDate < b.initialBooking AND p.city.city = :city OR " +
//            ":initialDate > b.endBooking AND :endDate > b.endBooking AND p.city.city = :city")
    @Query("FROM Product p left join p.booking b on p.id = b.product.id WHERE " +
            "(b.id is null " +
            "or b.initialBooking BETWEEN :initialDate AND :endDate " +
            "or b.endBooking BETWEEN :initialDate AND :endDate " +
            "or b.initialBooking > :endDate " +
            "or b.endBooking < :initialDate)" +
            "and p.city.city = :city")
    List<Product> filterByDateAndCity(String city, LocalDate initialDate, LocalDate endDate);
}

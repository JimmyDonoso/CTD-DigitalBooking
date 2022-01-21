package com.dh.BookingDigital.repository;

import com.dh.BookingDigital.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepository extends JpaRepository<City, Integer> {
}

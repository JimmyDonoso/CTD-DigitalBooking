package com.dh.BookingDigital.repository;

import com.dh.BookingDigital.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<Image, Integer> {
}

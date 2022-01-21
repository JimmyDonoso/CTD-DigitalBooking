package com.dh.BookingDigital.repository;

import com.dh.BookingDigital.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Integer> {
}

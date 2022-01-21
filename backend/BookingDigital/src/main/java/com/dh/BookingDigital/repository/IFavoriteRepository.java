package com.dh.BookingDigital.repository;

import com.dh.BookingDigital.model.Favorites;
import com.dh.BookingDigital.model.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IFavoriteRepository extends JpaRepository<Favorites,Integer> {

   List<Favorites> findByUserId(Integer id);

   Boolean existsByProductIdAndUserId(Integer productId, Integer userId);
}

package com.dh.BookingDigital.controller;

import com.dh.BookingDigital.dto.ProductDto;
import com.dh.BookingDigital.exception.ApiRequestException;
import com.dh.BookingDigital.model.Favorites;
import com.dh.BookingDigital.service.FavoriteServiceImpl;
import com.dh.BookingDigital.service.ProductServiceImpl;
import com.dh.BookingDigital.service.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/favorites")
public class FavoritesController {

    private final FavoriteServiceImpl favoriteService;
    private final ProductServiceImpl productService;
    private final UserServiceImpl userService;

    public FavoritesController(FavoriteServiceImpl favoriteService, ProductServiceImpl productService, UserServiceImpl userService) {
        this.favoriteService = favoriteService;
        this.productService = productService;
        this.userService = userService;
    }
    @PostMapping(value = "/add")
    public ResponseEntity<String>addFavorite(@RequestBody Favorites newFavorite){
        favoriteService.save(newFavorite);
        return ResponseEntity.ok("Favorito agregado exitosamente");
    }

    @GetMapping(value = "search/{id}")
    public ResponseEntity<?> getFavoriteById(@PathVariable Integer id) {
        if (id != null) {
            if (userService.searchUserById(id).isPresent()) {
                return ResponseEntity.ok(favoriteService.searchByUserId(id));
            } else {
                throw new ApiRequestException("El usuario con el id " + id + " no existe", HttpStatus.NOT_FOUND);
            }
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "delete/{id}")
        public void deleteFavoriteById(@PathVariable("id") Integer id){
        favoriteService.delete(id);
    }
}

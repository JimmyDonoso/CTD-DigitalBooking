package com.dh.BookingDigital.controller;

import com.dh.BookingDigital.model.City;
import com.dh.BookingDigital.service.CityServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cities")
public class CityController {
    public final CityServiceImpl cityService;

    public CityController(CityServiceImpl cityService) {
        this.cityService = cityService;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addCity(@RequestBody City newCity){
        cityService.save(newCity);
        return ResponseEntity.ok("Ciudad agregada correctamente");
    }

    @GetMapping
    public ResponseEntity<List<City>> getAllCities(){
        return ResponseEntity.ok(cityService.list());
    }
}

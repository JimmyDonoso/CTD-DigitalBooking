package com.dh.BookingDigital.controller;

import com.dh.BookingDigital.model.Image;
import com.dh.BookingDigital.service.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    ImageServiceImpl imageService;


    @PostMapping()
    public ResponseEntity<String> newImage(@Valid @RequestBody Image image){
        imageService.add(image);
        return ResponseEntity.ok("The imege was save successfully!");
    }

    @GetMapping(value = "/{id}")
    public Optional<Image> getImage(@PathVariable Integer id){
       return imageService.getImageById(id);

    }

    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Integer id){
        imageService.delete(id);
        return ResponseEntity.ok("The image with id: "+id+" was deleted");
    }


}

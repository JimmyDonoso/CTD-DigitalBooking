package com.dh.BookingDigital.service.inter;

import com.dh.BookingDigital.model.Image;
import org.springframework.core.io.ByteArrayResource;

import java.util.List;
import java.util.Optional;

public interface IImageService {
    void add (Image imageFile);
    void update(Image image);
    Optional<Image> getImageById(Integer id);
    void delete(Integer id);
    List<Image> getAllImages();
}
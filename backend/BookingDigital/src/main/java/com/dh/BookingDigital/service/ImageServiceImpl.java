package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.Image;
import com.dh.BookingDigital.repository.IImageRepository;
import com.dh.BookingDigital.service.inter.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements IImageService {

    @Autowired
    IImageRepository imageRepository;

    @Override
    public void add(Image image) { imageRepository.save(image);}

    @Override
    public void update(Image image) {
        if(image != null && (imageRepository.findById(image.getId())).isPresent()){
            imageRepository.save(image);
        }
    }

    @Override
    public List<Image> getAllImages () {
        return imageRepository.findAll();
    }

    @Override
    public Optional<Image> getImageById(Integer id) {
        return imageRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        imageRepository.deleteById(id);
    }
}

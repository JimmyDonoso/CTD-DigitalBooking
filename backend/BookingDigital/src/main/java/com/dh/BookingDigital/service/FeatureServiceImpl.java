package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.Feature;
import com.dh.BookingDigital.repository.IFeatureRepository;
import com.dh.BookingDigital.service.inter.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureServiceImpl implements IFeatureService<Feature> {

    @Autowired
    IFeatureRepository featureRepository;

    @Override
    public Feature save(Feature feature) {
        if (feature != null){
            return featureRepository.save(feature);
        }
        return null;
    }

    @Override
    public List<Feature> list() {
        return featureRepository.findAll();
    }

    @Override
    public Optional<Feature> searcheById(Integer id) {
        return featureRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        featureRepository.deleteById(id);
    }
}

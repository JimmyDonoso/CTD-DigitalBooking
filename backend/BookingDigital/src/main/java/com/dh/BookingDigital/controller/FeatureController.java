package com.dh.BookingDigital.controller;

import com.dh.BookingDigital.exception.ApiRequestException;
import com.dh.BookingDigital.model.Feature;
import com.dh.BookingDigital.service.FeatureServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/feature")
public class FeatureController {

    @Autowired
    FeatureServiceImpl featureService;

    @PostMapping()
    public ResponseEntity<String> newFeauture(@Valid @RequestBody Feature feature){
            featureService.save(feature);
            return ResponseEntity.ok("The feature was added successfully");
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<Feature>> getAllFeature(){
        return ResponseEntity.ok(featureService.list());
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<Feature> getFeatureById(@PathVariable Integer id){
        ResponseEntity<Feature> response = null;
        if(id != null && featureService.searcheById(id).isPresent()){
            response = ResponseEntity.ok(featureService.searcheById(id).get());
        } else {
            throw new ApiRequestException("The feature with "+id+" doesn't exists",HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<String> deleteFeauture(@PathVariable Integer id){
        ResponseEntity<String> response = null;
        if(id != null && featureService.searcheById(id).isPresent()){
            featureService.delete(id);
            response = ResponseEntity.ok("The feature with id: "+id+ " was deleted");
        }else{
            throw new ApiRequestException("The feature with id: "+id+" does not exists", HttpStatus.NOT_FOUND);
        }
        return response;
    }

}

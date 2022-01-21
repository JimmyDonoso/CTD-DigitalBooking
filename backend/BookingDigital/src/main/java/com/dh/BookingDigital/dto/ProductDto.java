package com.dh.BookingDigital.dto;

import com.dh.BookingDigital.model.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@ToString
public class ProductDto {
    private Integer id;

    @NotBlank(message = "El producto debe tener un nombre")
    private String name;

    @NotNull
    private String description;

    private Set<Feature> featuresSet = new HashSet<>();

    private Category category;

    private City city;

    private Set<Image> images;

    private Float latitude;

    private Float longitude;

    private String address;

    private Float price;

    private List<LocalDate> dateRange;

    public ProductDto() {
    }


}

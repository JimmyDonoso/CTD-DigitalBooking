package com.dh.BookingDigital.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "imagenes")
@Getter
@Setter
public class Image {
    @Id
    @SequenceGenerator(name = "imagen_sequence", sequenceName = "imagen_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "imagen_sequence")
    private Integer id;

    private String image;

    private String name;

    public Image() {
    }
}

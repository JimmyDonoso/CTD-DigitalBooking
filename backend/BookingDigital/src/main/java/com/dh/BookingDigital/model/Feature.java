package com.dh.BookingDigital.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "caracteristicas")
@Getter @Setter
public class Feature {

    @Id
    @SequenceGenerator(name = "caracteristica_sequence", sequenceName = "caracteristica_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "caracteristica_sequence")
    private Integer id;

    @NotBlank(message = "La característica debe tener un nombre")
    private String name;

    @NotNull
    private String icon;


    public Feature() {
    }

    public Feature(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    @Override
    public String toString() {
        return "Caracteristica{" +
                "id=" + id +
                ", nombre='" + name + '\'' +
                ", icono='" + icon + '\'' +
                '}';
    }
}

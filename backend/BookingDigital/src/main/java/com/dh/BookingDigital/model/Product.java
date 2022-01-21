package com.dh.BookingDigital.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "productos")
@Setter
public class Product {
    @Id
    @SequenceGenerator(name = "producto_sequence", sequenceName = "producto_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "producto_sequence")
    @Getter
    private Integer id;

    @NotBlank(message = "El producto debe tener un nombre")
    @Getter
    private String name;

    @NotNull
    @Getter
    private String description;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "productos_caracteristicas",
            joinColumns = @JoinColumn(name = "id_productos", referencedColumnName = "id", nullable = false, updatable = false),
            inverseJoinColumns = @JoinColumn(name = "id_caracteristicas", referencedColumnName = "id", nullable = false, updatable = false)
    )
    @Getter
    private Set<Feature> featuresSet = new HashSet<>();


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    @Getter
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ciudad_id")
    @Getter
    private City city;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    @Getter
    private Set<Image> images;

    @Getter
    private Float latitude;

    @Getter
    private Float longitude;

    @Getter
    private String address;

    @Getter
    private Float price;

    @OneToMany(mappedBy = "product") //CONTROLAR
    private Set<Booking> booking;

    @OneToMany(mappedBy = "product")
    private Set<Favorites> favorites;


    public Product() {
    }

    public Product(String name, String description, Category category, City city, Float latitude, Float longitude, String address, Float price) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.price = price;
    }

    public Product(String name, String description, Set<Feature> featuresSet, Category category, City city, Set<Image> images, Float latitude, Float longitude, String address, Float price) {
        this.name = name;
        this.description = description;
        this.featuresSet = featuresSet;
        this.category = category;
        this.city = city;
        this.images = images;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id + '\'' +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category=" + category +
                ", city=" + city +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", address='" + address + '\'' +
                ", price=" + price +
                '}';
    }
}

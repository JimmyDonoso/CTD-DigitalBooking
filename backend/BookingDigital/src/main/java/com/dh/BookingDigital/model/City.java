package com.dh.BookingDigital.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "ciudades")
@Getter @Setter
public class City {

    @Id
    @SequenceGenerator(name = "ciudad_sequence", sequenceName = "ciudad_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "ciudad_sequence")
    private Integer id;

    @NotNull
    private String city;

    @NotNull
    private String country;

//    @OneToMany(mappedBy = "city")
//    @JsonIgnore
//    private Set<Product> products;

    public City() {
    }

    public City(String city, String country) {
        this.city = city;
        this.country = country;
    }

    @Override
    public String toString() {
        return "Ciudad{" +
                "id=" + id +
                ", ciudad='" + city + '\'' +
                ", pais='" + country + '\'' +
                '}';
    }
}

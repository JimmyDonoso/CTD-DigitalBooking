package com.dh.BookingDigital.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.*;

@Entity
@Table(name = "roles")
@Getter @Setter
//@ToString
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public Rol(String name) {
        this.name = name;
    }

    public Rol() {
    }
}

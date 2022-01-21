package com.dh.BookingDigital.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "favoritos")
@Getter
@Setter
public class Favorites {

    @Id
    @SequenceGenerator(name = "favorite_sequence", sequenceName = "favorite_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "favorite_sequence")
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private User user;

    public Favorites() {
    }

    public Favorites(Integer id, Product product, User user) {
        this.id = id;
        this.product = product;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Favorites{" +
                "id=" + id +
                ", product=" + product +
                ", user=" + user +
                '}';
    }
}

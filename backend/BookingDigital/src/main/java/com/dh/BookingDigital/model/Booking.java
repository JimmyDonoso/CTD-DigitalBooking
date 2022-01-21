package com.dh.BookingDigital.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.Optional;

@Entity
@Table(name = "booking")
@Getter @Setter
public class Booking {

    @Id
    @SequenceGenerator(name="booking_sequence", sequenceName = "booking_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "booking_sequence")
    private Integer id;

    private LocalTime bookingTime;

    private LocalDate initialBooking;

    private LocalDate endBooking;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private User user;

    public Booking () {
    }

    public Booking(String bookingTime, String initialBooking, String endBooking, Product product, User user) {
        this.bookingTime = LocalTime.parse(bookingTime);
        this.initialBooking = LocalDate.parse(initialBooking);
        this.endBooking = LocalDate.parse(endBooking);
        this.product = product;
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return id.equals(booking.id) && bookingTime.equals(booking.bookingTime) && initialBooking.equals(booking.initialBooking) && endBooking.equals(booking.endBooking) && product.equals(booking.product) && user.equals(booking.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, bookingTime, initialBooking, endBooking, product, user);
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", bookingTime=" + bookingTime +
                ", initialBooking=" + initialBooking +
                ", endBooking=" + endBooking +
//                ", producto=" + product +
                ", user=" + user +
                '}';
    }

}

package com.dh.BookingDigital.security;

import java.time.LocalDateTime;
import java.util.Objects;

public class UserTokenDto {
    private Integer id;
    private String email;
    private LocalDateTime dateTime;

    public UserTokenDto(Integer id, String email) {
        this.id = id;
        this.email = email;
    }

    public UserTokenDto(Integer id, String email, LocalDateTime dateTime) {
        this.id = id;
        this.email = email;
        this.dateTime = dateTime;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserTokenDto that = (UserTokenDto) o;
        return Objects.equals(id, that.id) && Objects.equals(email, that.email) && Objects.equals(dateTime, that.dateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, dateTime);
    }

    @Override
    public String toString() {
        return "UserTokenDto{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", dateTime=" + dateTime +
                '}';
    }
}

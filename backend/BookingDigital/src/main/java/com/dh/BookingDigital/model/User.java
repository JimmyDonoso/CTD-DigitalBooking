package com.dh.BookingDigital.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Null;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Getter @Setter
//@ToString
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name="usuario_sequence", sequenceName = "usuario_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_sequence")
    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private String password;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;

//    @Null
//    @OneToMany(mappedBy = "user")
//    private Set<Booking> Bookings;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(rol.getName()));
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User(String name, String lastName, String email, String password, Rol rol) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", rol=" + rol +
                '}';
    }
}

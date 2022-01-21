package com.dh.BookingDigital.security;

public class UserLoginDto {
    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private String token;
    private String rol;

    public UserLoginDto(Integer id,String name, String lastName, String email, String token, String rol) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
        this.rol = rol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getId() { return id;   }


    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}


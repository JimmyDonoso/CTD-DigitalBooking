package com.dh.BookingDigital.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "categorias")
@Getter @Setter
public class Category {

    @Id
    @SequenceGenerator(name = "categoria_sequence", sequenceName = "categoria_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "categoria_sequence")
    private Integer id;

    @NotBlank(message = "La categoría debe tener un título")
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String urlImage;

//    @OneToMany(mappedBy = "category")
//    @JsonIgnore
//    private Set<Product> products;

    public Category() {
    }

    public Category(String titulo, String description, String urlImage) {
        this.title = titulo;
        this.description = description;
        this.urlImage = urlImage;
    }

    public void setCategoria(Category category){
        this.title = category.getTitle();
        this.description = category.getDescription();
        this.urlImage = category.getUrlImage();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return Objects.equals(title, category.title) && Objects.equals(description, category.description) && Objects.equals(urlImage, category.urlImage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, description, urlImage);
    }

    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", titulo='" + title + '\'' +
                ", descripcion='" + description + '\'' +
                ", urlImagen='" + urlImage + '\'' +
                '}';
    }
}

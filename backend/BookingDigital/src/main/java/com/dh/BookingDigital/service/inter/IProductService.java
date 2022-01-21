package com.dh.BookingDigital.service.inter;

import com.dh.BookingDigital.dto.ProductDto;
import com.dh.BookingDigital.model.Product;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IProductService<Product> {
    Product save(Product product);
    List<ProductDto> list();
    Optional<Product> searchById(Integer id);
    Optional<ProductDto> searchByIdDto(Integer id);
    List<Product> filterProductByCategory(String category);
    List<ProductDto> filterProductByCity(String city);
    List<ProductDto> filterByDateAndCity(String city, LocalDate initialDate, LocalDate endDate);

}

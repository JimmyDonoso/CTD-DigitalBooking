package com.dh.BookingDigital.service.inter;

import java.util.List;
import java.util.Optional;

public interface ICategoryService<Category> {
    List<Category> list();
    Category save (Category t);
    void update(Category t);
    Optional<Category>searchById(Integer id);
    void delete(Integer id);
}

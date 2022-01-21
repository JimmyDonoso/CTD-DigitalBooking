package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.Category;
import com.dh.BookingDigital.repository.ICategoryRepository;
import com.dh.BookingDigital.service.inter.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements ICategoryService<Category> {
    private final ICategoryRepository categoryRepository;

    public CategoryServiceImpl(ICategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> list() {
        return categoryRepository.findAll();
    }

    @Override
    public Category save(Category category) {
        if(category != null && (categoryRepository.findByTitle(category.getTitle()).isEmpty())){
            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public void update(Category category) {
        if(category != null && (categoryRepository.findById(category.getId()).isPresent())) {
            categoryRepository.save(category);
        }
    }

    @Override
    public Optional<Category> searchById(Integer id) {
        return categoryRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        if(categoryRepository.findById(id).isPresent()){
            categoryRepository.deleteById(id);
        }
    }
}

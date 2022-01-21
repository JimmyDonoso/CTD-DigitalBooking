package com.dh.BookingDigital.controller;

import com.dh.BookingDigital.exception.ApiRequestException;
import com.dh.BookingDigital.model.Category;
import com.dh.BookingDigital.service.CategoryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/categories")
public class CategoryController {
     private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(categoryService.list());
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addCategoria(@Valid @RequestBody Category newCategory){
        categoryService.save(newCategory);
        return ResponseEntity.ok("Categoria agregada correctamente");
    }

    @PutMapping(value = "/update")
    public ResponseEntity<String> updateCategoria(@Valid @RequestBody Category newCategory)  {
        System.out.println(newCategory.toString());
        Category c = categoryService.searchById(newCategory.getId()).get();

        ResponseEntity<String> response = null;
        if (c != null) {
            c.setCategoria(newCategory);
            categoryService.update(c);

            response = ResponseEntity.ok("La categoría " + c.getTitle() + " fue actualizado con éxito");
        }else {
            throw new ApiRequestException("La categoría con el id " + newCategory.getId() + " no existe", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Integer id){
        ResponseEntity<Category> response = null;

        if (id != null && categoryService.searchById(id).isPresent()) {
            response = ResponseEntity.ok(categoryService.searchById(id).get());
        }else {
            throw new ApiRequestException("La categoría con el id " + id + " no existe", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Integer id){
        Category c = categoryService.searchById(id).get();

        ResponseEntity<String> response = null;
        if (id != null && categoryService.searchById(id).isPresent()) {
            categoryService.delete(id);
            response = ResponseEntity.ok("Categoría con id " + id + " eliminada correctamente");
        } else {
            throw new ApiRequestException("La categoría con el id " + id + " no existe", HttpStatus.NOT_FOUND);
        }
        return response;
    }
}

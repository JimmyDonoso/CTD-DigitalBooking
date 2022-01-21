package com.dh.BookingDigital.controller;


import com.dh.BookingDigital.dto.ProductDto;
import com.dh.BookingDigital.exception.ApiRequestException;
import com.dh.BookingDigital.model.Product;
import com.dh.BookingDigital.service.ProductServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
    private final ProductServiceImpl productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addProduct(@Valid @RequestBody Product newProduct){
        productService.save(newProduct);
        return ResponseEntity.ok("Producto agregado correctamente");
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Integer id){
        ResponseEntity<ProductDto> response = null;
        if (id != null && productService.searchByIdDto(id).isPresent()) {
            response = ResponseEntity.ok(productService.searchByIdDto(id).get());
        }else {
            throw new ApiRequestException("El producto con el id " + id + " no existe", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProductos(){
        System.out.println(productService.list());
        return ResponseEntity.ok(productService.list());
    }

    @PutMapping(value = "/modify/{id}")
    public ResponseEntity<Product> modifyProductById(@PathVariable Integer id, @RequestBody Product product) {
        ResponseEntity<Product> response = null;
        Product newProduct = productService.searchById(id).orElse(null);
        if (id != null && productService.searchById(id).isPresent()) {
            newProduct.setName(product.getName());
            newProduct.setDescription(product.getDescription());
            newProduct.setCategory(product.getCategory());
            newProduct.setCity(product.getCity());
            newProduct.setImages(product.getImages());
            newProduct.setFeaturesSet(product.getFeaturesSet());
            response = ResponseEntity.ok(productService.save(newProduct));
        }else {
            throw new ApiRequestException("El producto con el id " + id + " no existe", HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterProductByCategoryOrCity( String city, String category){
        if(city != null){
            return ResponseEntity.ok(productService.filterProductByCity(city));
        }if(category != null){
            return ResponseEntity.ok(productService.filterProductByCategory(category));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/searchByDateAndCity")
    public ResponseEntity<List<ProductDto>> filterByDateAndCity(@RequestParam String city, String initialDate, String endDate){
        System.out.println(city);
        System.out.println(initialDate);
        System.out.println(endDate);
        if(initialDate==null){
            return ResponseEntity.ok(productService.filterProductByCity(city));
        }
        LocalDate initialParsed = LocalDate.parse(initialDate);
        LocalDate finishParsed = LocalDate.parse(endDate);
        return ResponseEntity.ok(productService.filterByDateAndCity(city, initialParsed, finishParsed));
    }
}



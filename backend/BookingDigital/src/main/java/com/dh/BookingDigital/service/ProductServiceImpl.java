package com.dh.BookingDigital.service;

import com.dh.BookingDigital.dto.ProductDto;
import com.dh.BookingDigital.model.Booking;
import com.dh.BookingDigital.model.Product;
import com.dh.BookingDigital.repository.IProductRepository;
import com.dh.BookingDigital.service.inter.ICategoryService;
import com.dh.BookingDigital.service.inter.ICityService;
import com.dh.BookingDigital.service.inter.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class ProductServiceImpl implements IProductService<Product> {
    private final IProductRepository productRepository;
    private final ICategoryService categoryService;
    private final ICityService cityService;
    private final ModelMapper modelMapper;
    private final BookingServiceImpl bookingService;

    public ProductServiceImpl(IProductRepository productRepository, ICategoryService categoryService, ICityService cityService, ModelMapper modelMapper, BookingServiceImpl bookingService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.cityService = cityService;
        this.modelMapper = modelMapper;
        this.bookingService = bookingService;
    }

    @Override
    public Product save(Product product){
       if(product != null && (categoryService.searchById(product.getCategory().getId()).isPresent()) && (cityService.searchById(product.getCity().getId()).isPresent())) {
           return productRepository.save(product);
        }
       return null;
    }

    @Override
    public List<ProductDto> list(){
        List<Product> allProducts = productRepository.findAll();
        List<ProductDto> productDtoList = productToDto(allProducts);
        return productDtoList;
    }

    @Override
    public Optional<Product> searchById(Integer id){
        return productRepository.findById(id);
    }

    public Optional<ProductDto> searchByIdDto(Integer id){
        List<Product> products = new ArrayList<>();
        products.add(productRepository.findById(id).get());
        return Optional.of(productToDto(products).get(0));
    }

    @Override
    public List<ProductDto> filterProductByCity(String city){
        List<Product> products = productRepository.findAllProductsByCityCity(city);
        List<ProductDto> productDtoList = productToDto(products);
        return productDtoList;
    }

    @Override
    public List<Product> filterProductByCategory(String category){
        List<Product> products = productRepository.findAllProductsByCategoryTitle(category);
        return products;
    }

    @Override
    public List<ProductDto> filterByDateAndCity(String city, LocalDate initialDate, LocalDate endDate){
        initialDate = initialDate.plusDays(1);
        endDate = endDate.plusDays(-1);
        List<Product> productFilterByDate = productRepository.filterByDateAndCity(city, initialDate, endDate);
        List<ProductDto> productDtoList = filterRepeatedproductsList(productFilterByDate, initialDate.plusDays(-1), endDate.plusDays(1));
        System.out.println(productDtoList);
        return productDtoList;
    }

    public List<ProductDto> productToDto(List<Product> products){
        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : products) {
            List<Booking> bookings = bookingService.findByProductIdAndEndDateAfter(product.getId());
            ProductDto auxiliar = modelMapper.map(product, ProductDto.class);
            List<LocalDate> dateRange = new ArrayList<>();
            for (Booking booking  : bookings) {
                for (LocalDate date=booking.getInitialBooking();
                     date.isBefore(booking.getEndBooking().plusDays(1));
                     date=date.plusDays(1)) {
                    dateRange.add(date);
                }
            }
            auxiliar.setDateRange(dateRange);
            productDtoList.add(auxiliar);
        }
        return productDtoList;
    }

    private List<ProductDto> filterRepeatedproductsList(List<Product> ProductList, LocalDate startDate, LocalDate endDate) {
        List<List<Product>> list = new ArrayList<>();

        Boolean found = false;
        for (Product Product : ProductList) {
            for (List<Product> productsList : list) {
                if (productsList == null) break;
                if (productsList.contains(Product)) {
                    productsList.add(Product);
                    found = true;
                    break;
                }
            }
            if (!found) {
                List<Product> aux = new ArrayList<>();
                aux.add(Product);
                list.add(aux);
                found = false;
            }
        }

        List<ProductDto> ProductDtoFiltered = new ArrayList<>();
        for (List<Product> productsList : list) {
                List<Booking> bookingList = bookingService.findAllByProductIdAndPeriod(productsList.get(0).getId(),
                        startDate, endDate);

            if (bookingList.isEmpty()){
                List<Product> arrayList = new ArrayList<>();
                arrayList.add(productsList.get(0));
            ProductDtoFiltered.add(productToDto(arrayList).get(0));
            break;}

            System.out.println(bookingList);
                Booking bookingBefore;
                Booking bookingAfter;
                for (int i = 0; i < bookingList.size() - 1; i++) {
                    bookingBefore = bookingList.get(i);
                    bookingAfter = bookingList.get(i + 1);

                    if (DAYS.between(bookingBefore.getEndBooking(), bookingAfter.getInitialBooking()) > 1) {
                        List<Product> arrayList = new ArrayList<>();
                        arrayList.add(productsList.get(0));
                        ProductDtoFiltered.add(productToDto(arrayList).get(0));
                        break;
                    }
                }
            }
        return ProductDtoFiltered;
        }

}

package com.dh.BookingDigital.controller;

import com.dh.BookingDigital.exception.ApiRequestException;
import com.dh.BookingDigital.model.Booking;
import com.dh.BookingDigital.model.Product;
import com.dh.BookingDigital.service.BookingServiceImpl;
import com.dh.BookingDigital.service.ProductServiceImpl;
import com.dh.BookingDigital.service.UserServiceImpl;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/booking")
public class BookingController {

    private final BookingServiceImpl bookingService;
    private final ProductServiceImpl productService;
    private final UserServiceImpl userService;

    Logger log = Logger.getLogger(BookingController.class);

    public BookingController(BookingServiceImpl bookingService, ProductServiceImpl productService, UserServiceImpl userService) {
        this.bookingService = bookingService;
        this.productService = productService;
        this.userService = userService;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addBooking(@RequestBody Booking newBooking){
        bookingService.save(newBooking);
        return ResponseEntity.ok("Reserva agregada correctamente!");
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<List<Booking>> getBookingsByProductId(@PathVariable Integer id){
        List<Booking> response = new ArrayList<>();
        List<Booking> bookingsList = bookingService.list();
        if (id != null && productService.searchById(id).isPresent()) {
            for (Booking booking : bookingsList) {
                if(booking.getProduct().getId() == id) {
                    response.add(booking);
                }
            }
        }else {
            throw new ApiRequestException("El producto con el id " + id + " no existe", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(response);
    }

//    @GetMapping(value = "/search/user{id}")
//    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Integer id){
//        List<Booking> response = new ArrayList<>();
//        List<Booking> bookingsList = bookingService.list();
//        if (id != null && userService.searchUserById(id).isPresent()) {
//            for (Booking booking : bookingsList) {
//                if(Objects.equals(booking.getUser().getId(), id)) {
//                    response.add(booking);
//                }
//            }
//        }else {
//            throw new ApiRequestException("El usuario con el id " + id + " no existe", HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok(response);
//    }

    @GetMapping(value = "/search/user/{email}")
    public ResponseEntity<List<Booking>> getBookingsByUserEmail(@PathVariable String email){
        List<Booking> response = new ArrayList<>();
        List<Booking> bookingsList = bookingService.list();
        if (email != null && userService.searchByEmail(email).isPresent()) {
            for (Booking booking : bookingsList) {
                if(Objects.equals(booking.getUser().getEmail(), email)) {
                    response.add(booking);
                }
            }
        }else {
            throw new ApiRequestException("El usuario con el email " + email + " no existe", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings(){
        System.out.println(bookingService.list());
        return ResponseEntity.ok(bookingService.list());
    }

    @GetMapping("/filterByDate")
    public ResponseEntity<List<Product>> filterByDate(@RequestParam String initialDate, @RequestParam String endDate){
        LocalDate initialParsed = LocalDate.parse(initialDate);
        LocalDate finishParsed = LocalDate.parse(endDate);
        return ResponseEntity.ok(bookingService.filterByDate(initialParsed, finishParsed));
    }
}

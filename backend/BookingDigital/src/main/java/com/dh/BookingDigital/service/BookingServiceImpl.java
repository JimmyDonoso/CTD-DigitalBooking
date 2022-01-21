package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.Booking;
import com.dh.BookingDigital.model.Product;
import com.dh.BookingDigital.model.User;
import com.dh.BookingDigital.repository.IBookingRepository;
import com.dh.BookingDigital.service.inter.IBookingService;
import com.dh.BookingDigital.service.inter.IProductService;
import com.dh.BookingDigital.service.inter.IUserService;
import org.apache.log4j.Logger;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.time.LocalDate;
import java.util.*;

@Service
public class BookingServiceImpl implements IBookingService<Booking> {

    private final IBookingRepository bookingRepository;
    @Autowired
    private IProductService productService;
    private final IUserService userService;

    Logger log = Logger.getLogger(BookingServiceImpl.class);

    public BookingServiceImpl(IBookingRepository bookingRepository, IUserService userService) {
        this.bookingRepository = bookingRepository;
        this.userService = userService;
    }

    @Override
    public Booking save(Booking booking) {
        Optional<Product> productOptional = productService.searchById(booking.getProduct().getId());
        System.out.println(productOptional);
        Optional<User> userOptional = userService.searchByEmail(booking.getUser().getEmail());
        System.out.println(userOptional);
        if(booking != null && (userOptional.isPresent() && productOptional.isPresent())) {
            booking.setProduct(productOptional.get());
            booking.setUser(userOptional.get());
            return bookingRepository.save(booking);
        }
        return null;
    }

    public List<Booking> findAllByProductIdAndPeriod (Integer id, LocalDate startDate, LocalDate endDate) {
        System.out.println(startDate);
        System.out.println(endDate);
        return bookingRepository.findD(id, startDate, endDate);
    }

    public List<Booking> findByProductIdAndEndDateAfter(Integer id) {
        LocalDate endDate = LocalDate.now().plusDays(-1);
        return bookingRepository.findByProduct_IdAndEndBookingAfter(id, endDate);
    }

    @Override
    public List<Booking> list() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> searchById(Integer id) {
        return bookingRepository.findById(id);
    }

    @Override
    public Set<Booking> findByProductId(Integer id) {
        return bookingRepository.findByProductId(id);
    }

    @Override
    public List<Product> filterByDate(LocalDate initialDate, LocalDate endDate){
        List<Booking> bookingFilerByDate = bookingRepository.filterByDate(initialDate, endDate);
        List<Product> productFilterByDate= new ArrayList<>();

        for (Booking booking : bookingFilerByDate) {
            productFilterByDate.add(booking.getProduct());
        }
        return productFilterByDate;
    }
}

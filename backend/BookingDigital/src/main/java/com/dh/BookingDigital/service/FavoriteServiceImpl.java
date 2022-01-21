package com.dh.BookingDigital.service;

import com.dh.BookingDigital.model.Favorites;
import com.dh.BookingDigital.model.Product;
import com.dh.BookingDigital.model.User;
import com.dh.BookingDigital.repository.IFavoriteRepository;
import com.dh.BookingDigital.service.inter.IFavoriteService;
import com.dh.BookingDigital.service.inter.IProductService;
import com.dh.BookingDigital.service.inter.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteServiceImpl implements IFavoriteService {

    @Autowired
    private IFavoriteRepository favoriteRepository;
    @Autowired
    private IProductService productService;
    @Autowired
    private final IUserService userService;

    public FavoriteServiceImpl(IUserService userService) {
        this.userService = userService;
    }

    @Override
    public Favorites save(Favorites favorite) {
        if(favoriteRepository.existsByProductIdAndUserId(favorite.getProduct().getId(), favorite.getUser().getId())){
            return null;
        }
        Optional<Product> productOptional = productService.searchById(favorite.getProduct().getId());
        Optional<User> userOptional = userService.searchUserById(favorite.getUser().getId());
        if(favorite != null && (userOptional.isPresent() && productOptional.isPresent())) {
            favorite.setProduct(productOptional.get());
            favorite.setUser(userOptional.get());
            return favoriteRepository.save(favorite);
        }
        return null;
    }

    @Override
    public List<Favorites> searchByUserId(Integer id){
        return favoriteRepository.findByUserId(id);
    }

    @Override
    public Optional<Favorites> searchById(Integer id){
        return favoriteRepository.findById(id);
    }

    @Override
    public List<Favorites> list() {
        return favoriteRepository.findAll();
    }

    @Override
    public void delete(Integer id) {
        favoriteRepository.deleteById(id);
    }
}

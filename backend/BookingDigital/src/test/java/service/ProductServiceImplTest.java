 package service;

 import com.dh.BookingDigital.BookingDigitalApplication;
 import com.dh.BookingDigital.dto.ProductDto;
 import com.dh.BookingDigital.model.*;
 import com.dh.BookingDigital.repository.ICategoryRepository;
 import com.dh.BookingDigital.repository.ICityRepository;
 import com.dh.BookingDigital.repository.IProductRepository;
 import com.dh.BookingDigital.service.CategoryServiceImpl;
 import com.dh.BookingDigital.service.CityServiceImpl;
 import com.dh.BookingDigital.service.ProductServiceImpl;
 import org.apache.log4j.Logger;
 import org.junit.jupiter.api.AfterEach;
 import org.junit.jupiter.api.BeforeEach;
 import org.junit.jupiter.api.Test;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.test.context.SpringBootTest;
 import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

 import java.text.ParseException;
 import java.time.LocalDate;
 import java.util.ArrayList;
 import java.util.List;
 import java.util.Optional;
 import java.util.Set;

 import static org.junit.jupiter.api.Assertions.*;

 @SpringBootTest(classes={BookingDigitalApplication.class})
 class ProductServiceImplTest {
     Logger log = Logger.getLogger(ProductServiceImplTest.class);

     @Autowired
     ProductServiceImpl productoService;
     @Autowired
     IProductRepository productoRepository;
     @Autowired
     CityServiceImpl ciudadService;
     @Autowired
     ICityRepository ciudadRepository;
     @Autowired
     CategoryServiceImpl categoriaService;
     @Autowired
     ICategoryRepository categoriaRepository;



     Product product;
     Product product1;
     Set<Feature> featureSet;
     Set<Image> imageSet;
     Category category;
     Category category1;
     City city;
     City city1;

     @BeforeEach
     void setUp() throws ParseException {
         category = new Category("Playa", "Las mejores opciones para una visita veraniega", "https://www.campoloco.es/wp-content/uploads/2015/08/casa-de-verano.jpg");
         categoriaRepository.save(category);
         city = new City("Buenos Aires", "Argentina");
         ciudadRepository.save(city);
         product = new Product("Voyage", "El hotel de tus vacaciones", featureSet, category, city, imageSet, 10.0f, 10.0f, "Calle falsa 123", 250.0f);
         productoRepository.save(product);

         category1 = new Category("Invierno",  "Las mejores opciones para una visita invernal", "http://www.casamadera.info/wp-content/uploads/2012/05/casa-invierno.jpg");
         categoriaRepository.save(category1);
         city1 = new City("Cordoba", "Argentina");
         ciudadRepository.save(city1);
         product1 = new Product("Voyage", "El hotel de tus vacaciones", featureSet, category1, city1, imageSet, 10.0f, 10.0f, "Calle falsa 321", 150.0f);
     }

     @AfterEach
     void tearDown() {
         productoRepository.delete(product);
         productoRepository.delete(product1);
         categoriaRepository.delete(category);
         categoriaRepository.delete(category1);
         ciudadRepository.delete(city);
         ciudadRepository.delete(city1);
     }


     @Test
     void save() {
         Product added = productoService.save(product1);
         assertNotNull(added);
         log.info(added);
     }

     @Test
     void list() {
         assertNotNull(productoService.list());
         log.info(productoService.list());
     }

     @Test
     void searchById() {
         Optional<Product> search = productoService.searchById(product.getId());

         assertEquals(product.toString(), search.get().toString());
         log.info(search.get());
         log.info(product.toString());
     }

     @Test
     void filterProductByCity () {
         String city = productoService.searchById(product.getId()).get().getCity().getCity();
         List<Product> products = productoRepository.findAllProductsByCityCity(city);
         assertEquals(products.get(0).getCity().getCity(), city);
         log.info(city);
         log.info(products.get(0).getCity().getCity());
     }

     @Test
     void filterProductByCategory () {
         String categoryTitle = productoService.searchById(product.getId()).get().getCategory().getTitle();
         List<Product> products = productoRepository.findAllProductsByCategoryTitle(categoryTitle);
         assertEquals(products.get(0).getCategory().getTitle(), categoryTitle);
         log.info(categoryTitle);
         log.info(products.get(0).getCategory().getTitle());
     }

     @Test
     void filterByDateAndCity () {
         String city = productoService.searchById(product.getId()).get().getCity().getCity();
         LocalDate initialDate = LocalDate.of(2021, 12, 14).plusDays(1);
         LocalDate endDate = LocalDate.of(2021, 12, 19).plusDays(-1);
         List<Product> productFilterByDate = productoRepository.filterByDateAndCity(city, initialDate, endDate);
         assertEquals(productFilterByDate.get(0).getCity().getCity(), city);
         log.info(productFilterByDate);
     }

 }
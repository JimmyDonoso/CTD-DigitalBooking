 package service;

 import com.dh.BookingDigital.BookingDigitalApplication;
 import com.dh.BookingDigital.model.*;
 import com.dh.BookingDigital.repository.*;
 import com.dh.BookingDigital.service.BookingServiceImpl;
 import com.dh.BookingDigital.service.inter.IProductService;
 import com.dh.BookingDigital.service.inter.IUserService;
 import org.apache.log4j.Logger;
 import org.junit.jupiter.api.AfterEach;
 import org.junit.jupiter.api.BeforeEach;
 import org.junit.jupiter.api.Test;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.test.context.SpringBootTest;

 import java.text.ParseException;
 import java.time.LocalDate;
 import java.util.List;
 import java.util.Optional;
 import java.util.Set;

 import static org.junit.jupiter.api.Assertions.*;

 @SpringBootTest(classes = {BookingDigitalApplication.class})
 class BookingServiceImplTest {
     Logger log = Logger.getLogger(BookingServiceImplTest.class);

     @Autowired
     IBookingRepository bookingRepository;
     @Autowired
     BookingServiceImpl bookingService;
     @Autowired
     IProductRepository productRepository;
     @Autowired
     IUserRepository userRepository;
     @Autowired
     ICityRepository cityRepository;
     @Autowired
     ICategoryRepository categoryRepository;


     Booking booking1;
     Product product1;
     User user1;
     Category category1;
     City city1;
     Set<Feature> featureSet;
     Set<Image> imageSet;
     Rol rol1;

     @BeforeEach
     void setUp() throws ParseException {
         category1 = new Category("Playa", "Las mejores opciones para una visita veraniega", "https://www.campoloco.es/wp-content/uploads/2015/08/casa-de-verano.jpg");
         categoryRepository.save(category1);
         city1 = new City("Buenos Aires", "Argentina");
         cityRepository.save(city1);
         product1 = new Product("Voyage", "El hotel de tus vacaciones", featureSet, category1, city1, imageSet, 10.0f, 10.0f, "Calle falsa 123", 250.0f);
         productRepository.save(product1);
         user1 = new User("Pedro", "Perez", "pedrito@gmail.com", "pass123", rol1);
         userRepository.save(user1);
         booking1 = new Booking("12:00", "2022-04-14", "2022-04-18", product1, user1);
         bookingRepository.save(booking1);
     }

     @AfterEach
     void tearDown() {
         bookingRepository.delete(booking1);
         productRepository.delete(product1);
         categoryRepository.delete(category1);
         cityRepository.delete(city1);
         userRepository.delete(user1);
     }

     @Test
     void save() {
         assertNotNull(booking1);
         log.info(booking1.getId());
     }

     @Test
     void list() {
         assertNotNull(bookingService.list());
         log.info(bookingService.list());
     }

     @Test
     void searchById() {
         Optional<Booking> bookingId = bookingService.searchById(booking1.getId());
         assertEquals(bookingId.get().getId(), booking1.getId());
         log.info(bookingId.get().getId());
         log.info(booking1.getId());
     }

     @Test
     void findAllByProductIdAndPeriod () {
         Integer id = product1.getId();
         LocalDate startDate = LocalDate.of(2021, 12, 14).plusDays(1);
         LocalDate endDate = LocalDate.of(2021, 12, 19).plusDays(-1);
         log.info(bookingRepository.findD(id, startDate, endDate));
     }

//     public List<Booking> findAllByProductIdAndPeriod (Integer id, LocalDate startDate, LocalDate endDate) {
//         System.out.println(startDate);
//         System.out.println(endDate);
//         return bookingRepository.findD(id, startDate, endDate);
//     }
//
//     public List<Booking> findByProductIdAndEndDateAfter(Integer id) {
//         LocalDate endDate = LocalDate.now().plusDays(-1);
//         return bookingRepository.findByProduct_IdAndEndBookingAfter(id, endDate);
//     }

 }
 package service;

 import com.dh.BookingDigital.BookingDigitalApplication;
 import com.dh.BookingDigital.model.City;
 import com.dh.BookingDigital.repository.ICityRepository;
 import com.dh.BookingDigital.service.CityServiceImpl;
 import org.apache.log4j.Logger;
 import org.junit.jupiter.api.AfterEach;
 import org.junit.jupiter.api.BeforeEach;
 import org.junit.jupiter.api.Test;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.test.context.SpringBootTest;

 import java.util.Optional;

 import static org.junit.jupiter.api.Assertions.*;

 @SpringBootTest(classes={BookingDigitalApplication.class})
 class CityServiceImplTest {
     Logger log = Logger.getLogger(CityServiceImplTest.class);

     @Autowired
     ICityRepository ciudadRepository;
     @Autowired
     CityServiceImpl ciudadService;

     City city;
     City city1;

     @BeforeEach
     void setUp() {
         city = new City("Necochea", "Argentina");
         city1 = new City("Puerto Madryn", "Argentina");
         ciudadRepository.save(city);
     }

     @AfterEach
     void tearDown() {
         ciudadRepository.delete(city);
         ciudadRepository.delete(city1);
     }

     @Test
     void save() {
         City agregado = ciudadRepository.save(city1);
         assertNotNull(agregado);
         log.info(agregado.getId());
     }

     @Test
     void list() {
         assertNotNull(ciudadService.list());
         log.info(ciudadService.list());
     }

     @Test
     void searchById() {
         Optional<City> buscar = ciudadService.searchById(city.getId());
         assertEquals(city.toString(), buscar.get().toString());
         log.info(buscar.get());
         log.info(city.toString());
     }
 }
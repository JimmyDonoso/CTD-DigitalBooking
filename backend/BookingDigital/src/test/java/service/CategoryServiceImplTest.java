 package service;

 import com.dh.BookingDigital.BookingDigitalApplication;
 import com.dh.BookingDigital.model.Category;
 import com.dh.BookingDigital.repository.ICategoryRepository;
 import com.dh.BookingDigital.service.CategoryServiceImpl;
 import org.apache.log4j.Logger;
 import org.junit.jupiter.api.AfterEach;
 import org.junit.jupiter.api.BeforeEach;
 import org.junit.jupiter.api.Test;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.test.context.SpringBootTest;

 import java.util.Optional;

 import static org.junit.jupiter.api.Assertions.*;

 @SpringBootTest(classes={BookingDigitalApplication.class})
 class CategoryServiceImplTest {
     Logger log = Logger.getLogger(CategoryServiceImplTest.class);

     @Autowired
     CategoryServiceImpl categoriaService;
     @Autowired
     ICategoryRepository categoriaRepository;

     Category category;
     Category category1;

     @BeforeEach
     void setUp() {
         category = new Category("Playa", "Las mejores opciones para una visita veraniega", "https://www.campoloco.es/wp-content/uploads/2015/08/casa-de-verano.jpg");
         category1 = new Category("Invierno", "Las mejores opciones para una visita invernal", "http://www.casamadera.info/wp-content/uploads/2012/05/casa-invierno.jpg");
         category = categoriaRepository.save(category);
     }

     @AfterEach
     void tearDown() {
         categoriaRepository.delete(category);
         categoriaRepository.delete(category1);
     }

     @Test
     void list() {
         assertNotNull(categoriaService.list());
         log.info(categoriaService.list());
     }

     @Test
     void save() {
          Category agregado = categoriaService.save(category1);
          assertNotNull(agregado);
          log.info(agregado.getId());
     }

     @Test
     void update() {
         Category category2 = new Category("Verano", "Las mejores opciones para una visita veraniega", "https://www.campoloco.es/wp-content/uploads/2015/08/casa-de-verano.jpg");
         category.setCategoria(category2);
         categoriaService.update(category);
         assertTrue(category.equals(categoriaRepository.findById(category.getId()).get()));
         log.debug(categoriaRepository.findById(category.getId()));
     }

     @Test
     void searchById() {
         Optional<Category> buscar = categoriaService.searchById(category.getId());

         assertTrue(category.equals(buscar.get()));
         log.info(categoriaRepository.findById(category.getId()).toString());
         log.info(category.toString());
     }

     @Test
     void delete() {
         categoriaService.delete(category.getId());
         assertFalse(categoriaRepository.findById(category.getId()).isPresent());
         log.info(category.toString());
     }
 }
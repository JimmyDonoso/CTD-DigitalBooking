-- -----------------------------------------------------
-- Schema dh
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dh
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dh` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `dh` ;

-- -----------------------------------------------------
-- Table `dh`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`categorias` (
  `id` INT NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `url_image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`ciudades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`ciudades` (
  `id` INT NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`productos` (
  `id` INT NOT NULL,
  `address` VARCHAR(500) NULL DEFAULT NULL,
  `description` VARCHAR(3000) NOT NULL,
  `latitude` FLOAT NULL DEFAULT NULL,
  `longitude` FLOAT NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  `categoria_id` INT NULL DEFAULT NULL,
  `ciudad_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK2fwq10nwymfv7fumctxt9vpgb` (`categoria_id` ASC) VISIBLE,
  INDEX `FK2n66ase94bg4q6j56jdm4nj17` (`ciudad_id` ASC) VISIBLE,
  CONSTRAINT `FK2fwq10nwymfv7fumctxt9vpgb`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `dh`.`categorias` (`id`),
  CONSTRAINT `FK2n66ase94bg4q6j56jdm4nj17`
    FOREIGN KEY (`ciudad_id`)
    REFERENCES `dh`.`ciudades` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`usuarios` (
  `id` INT NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `rol_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKqf5elo4jcq7qrt83oi0qmenjo` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FKqf5elo4jcq7qrt83oi0qmenjo`
    FOREIGN KEY (`rol_id`)
    REFERENCES `dh`.`roles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`booking` (
  `id` INT NOT NULL,
  `booking_time` TIME NULL DEFAULT NULL,
  `end_booking` DATE NULL DEFAULT NULL,
  `initial_booking` DATE NULL DEFAULT NULL,
  `producto_id` INT NULL DEFAULT NULL,
  `usuario_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK56j2s7b7e1nhhncl1t2wy60yn` (`producto_id` ASC) VISIBLE,
  INDEX `FK9mgqqp9t1jcq7d4vl4bb0l5k5` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `FK56j2s7b7e1nhhncl1t2wy60yn`
    FOREIGN KEY (`producto_id`)
    REFERENCES `dh`.`productos` (`id`),
  CONSTRAINT `FK9mgqqp9t1jcq7d4vl4bb0l5k5`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `dh`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`booking_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`booking_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`caracteristica_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`caracteristica_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`caracteristicas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`caracteristicas` (
  `id` INT NOT NULL,
  `icon` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`categoria_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`categoria_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`ciudad_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`ciudad_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`imagen_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`imagen_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`imagenes` (
  `id` INT NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKswpig7nda0oj2ci8rsbto57kg` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FKswpig7nda0oj2ci8rsbto57kg`
    FOREIGN KEY (`product_id`)
    REFERENCES `dh`.`productos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`producto_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`producto_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`productos_caracteristicas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`productos_caracteristicas` (
  `id_productos` INT NOT NULL,
  `id_caracteristicas` INT NOT NULL,
  PRIMARY KEY (`id_productos`, `id_caracteristicas`),
  INDEX `FKobp9yu0gsg8ml1rsvyar4cbco` (`id_caracteristicas` ASC) VISIBLE,
  CONSTRAINT `FKobp9yu0gsg8ml1rsvyar4cbco`
    FOREIGN KEY (`id_caracteristicas`)
    REFERENCES `dh`.`caracteristicas` (`id`),
  CONSTRAINT `FKp9vv5ptrbljyltb8p4v32jdmj`
    FOREIGN KEY (`id_productos`)
    REFERENCES `dh`.`productos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dh`.`usuario_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`usuario_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Query de insercion de datos iniciales
-- -----------------------------------------------------
INSERT INTO
  `dh`.`categorias` (`id`, `description`, `title`, `url_image`)
values
  (
    1,
    'Hospedaje para 3 o más personas, sientete como en casa',
    'Casa',
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Categories/casa.jpg'
  ),
  (
    2,
    'Hospedaje para parejas o grupos',
    'Departamento',
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Categories/departamento.png'
  ),
  (
    3,
    'Alquiler por temporadas para parejas o individual',
    'Hotel',
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Categories/hotel.jpg'
  ),
  (
    4,
    'Alquiler para fines de semana',
    'Campestre',
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Categories/quinta.jpg'
  );

INSERT INTO
  `dh`.`categoria_sequence` (`next_val`)
VALUES
  (5);

INSERT INTO
  `dh`.`ciudades` (`id`, `city`, `country`)
VALUES
  (1, 'Buenos Aires', 'Argentina'),
  (2, 'Bogota', 'Colombia'),
  (3, 'Medellin', 'Colombia'),
  (4, 'Cali', 'Colombia'),
  (5, 'Barranquilla', 'Colombia'),
  (6, 'Cartagena', 'Colombia'),
  (7, 'Bucaramanga', 'Colombia'),
  (8, 'Cucuta', 'Colombia'),
  (9, 'Santa Marta', 'Colombia'),
  (10, 'Pereira', 'Colombia'),
  (11, 'Manizales', 'Colombia'),
  (12, 'Bello', 'Colombia'),
  (13, 'Armenia', 'Colombia'),
  (14, 'Barranquilla', 'Colombia'),
  (15, 'Guadalajara', 'Mexico'),
  (16, 'Monterrey', 'Mexico'),
  (17, 'Ciudad de Mexico', 'Mexico'),
  (18, 'Quito', 'Ecuador'),
  (19, 'Guayaquil', 'Ecuador'),
  (20, 'Cordoba', 'Argentina'),
  (21, 'Mendoza', 'Argentina'),
  (22, 'Santiago', 'Chile'),
  (23, 'Potrerillos', 'Argentina'),
  (24, 'San Carlos de Bariloche', 'Argentina'),
  (25, 'La Plata', 'Argentina'),
  (26, 'San Miguel de Tucuman', 'Argentina'),
  (27, 'San Juan', 'Argentina'),
  (28, 'Santa Fe', 'Argentina'),
  (29, 'Rosario', 'Argentina'),
  (30, 'Dina Huapi', 'Argentina'),
  (31, 'Bariloche', 'Argentina'),
  (32, 'Ciudad de Mexico', 'Mexico'),
  (33, 'Quindio', 'Colombia');

INSERT INTO
  `dh`.`ciudad_sequence` (`next_val`)
VALUES
  (34);

INSERT INTO
  `dh`.`productos` (
    `id`,
    `description`,
    `name`,
    `categoria_id`,
    `ciudad_id`,
    `latitude`,
    `longitude`,
    `address`,
    `price`
  )
VALUES
  (
    1,
    'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones',
    'Libi',
    3,
    1,
    -34.619323,
    -58.371609,
    'Av. San Telmo, San Telmo',
    100
  ),
  (
    2,
    'En el centro de la ciudad, vive una de las experiencias inolvidables de la vida',
    'Hotel Four Points',
    3,
    4,
    3.459396,
    -76.529806,
    'Calle 18 Norte #4N-08',
    95
  ),
  (
    3,
    'Vive una experiencia unica, disfruta de un albergue inspirado en las pasiones',
    'California Bello', 
    2,
    12,
    6.333793,
    -75.553960,
    'Carrera 45 #46A-03',
    123
  ),
  (
    4,
    'La Casa Legado se encuentra en Bogotá, a 3,6 km de la Zona T, y ofrece alojamiento con bar, aparcamiento privado gratuito, salón compartido y jardín. Hay servicio de habitaciones, servicio de conserjería y WiFi gratuita en todas las instalaciones. El establecimiento cuenta con cocina compartida, salas de reuniones, mostrador de información turística y servicio de planchado.',
    'Casa Legado',
    1,
    2,
    4.652971,
    -74.058089,
    'Carrera 8 #69-60',
    120
  ),
  (
    5,
    'La Posada del Blanco está situada en Potrerillos y cuenta con restaurante, bar, jardín y conexión Wi-Fi gratuita. Todas las habitaciones tienen terraza. Las habitaciones disponen de aire acondicionado, armario, caja fuerte, TV de pantalla plana, balcón y baño privado con bidet. Los alojamientos disponen de minibar.',
    'La Posada del Blanco',
    3,
    21,
    -33.082370,
    -69.271870,
    'Ruta Provincial 89 S/N, 300 mts por desvio a Vallecitos',
    180
  ),
  (
    6,
    'El Orange Cartagena ofrece conexión inalámbrica a internet gratuita, una piscina exterior y un alojamiento amplio. Todos los apartamentos disponen de un balcón con zona de estar. Todos los apartamentos del Orange Cartagena tienen una cocina y están equipados con muebles modernos. Las instalaciones de cocina incluyen un microondas y una nevera.',
    'Orange Cartagena',
    2,
    6,
    10.394751,
    -75.551502,
    'Carrera 10 #5A-15',
    230
  ),
  (
    7,
    'Estos apartamentos de 2 estrellas están bien equipados y se encuentran a las afueras de San Carlos de Bariloche, en una zona relajante a orillas del precioso lago Nahuel Huapi. Ofrecen jardín y zona de barbacoa comunes.',
    'Costa Azul',
    2,
    24,
    -41.126107,
    -71.356959,
    'Av. Bustillo, 4200',
    250
  ),
  (
    8,
    'Casa el Verano ofrece alojamiento en La Plata, a 11 km del estadio Ciudad de La Plata, a 15 km del Museo de la Plata y a 14 km de la catedral de La Plata. El establecimiento cuenta con piscina privada y aparcamiento privado gratuito.' 'Casa el Verano',
    'Verano verde',
    1,
    25,
    -34.917540,
    -57.951731,
    'Villa Elisa, 1894',
    300
  ),
  (
    9,
    'La Casa De Verano Piscina Privada está situada en La Tebaida y cuenta con piscina al aire libre y salón compartido. Esta casa tiene piscina privada, jardín, zona de barbacoa, conexión WiFi gratuita y aparcamiento privado gratuito.',
    'Casa De Verano Piscina',
    1,
    33,
    4.472375,
    -75.762786,
    'Via al aeropuerto el eden, 633004',
    350
  ),
  (
    10,
    'La Posada del Angel ofrece habitaciones y cabañas de montaña en un terreno de 5 hectáreas de parque y bosque. Se encuentra a 300 metros del lago Nahuel Huapi y a 12 km del centro de Bariloche.Las cabañas de la Posada del Angel cuentan con habitaciones con suelo de moqueta, TV por cable, baño privado y cocina completa. Todas incluyen servicio de limpieza.',
    'Posada del Angel',
    4,
    24,
    -41.103253,
    -71.443607,
    'Avenida Bustillo Km.12600, 8400',
    400
  ),
  (
    11,
    'El Greja Lodge, Limay, Patagonia está situado en Dina Huapi y ofrece vistas al jardín, WiFi gratuita y aparcamiento privado gratuito. Dispone de patio, vistas al lago, zona de estar, TV de pantalla plana, cocina totalmente equipada con microondas y nevera y baño privado con bidet. Hay horno, fogones y hervidor de agua.',
    'Greja Lodge',
    4,
    30,
    -41.056795,
    -71.151645,
    'Avenida de los Pescadores Lote 1 Río Negro',
    420
  );

INSERT INTO
  `dh`.`producto_sequence` (`next_val`)
VALUES
  (12);

INSERT INTO
  `dh`.`imagenes` (`id`, `image`, `name`, `product_id`)
VALUES
  (
    1,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H1.jpg',
    'Hotel-entrada',
    1
  ),
  (
    2,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H2.jpg',
    'Hotel-sala',
    1
  ),
  (
    3,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H3.jpg',
    'Hotel-sala2',
    1
  ),
  (
    4,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H4.jpg',
    'Hotel-sala3',
    1
  ),
  (
    5,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H5.jpg',
    'Hotel-banio',
    1
  ),
  (
    6,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H6.jpg',
    'Hotel-room',
    1
  ),
  (
    7,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H7.jpg',
    'Hotel-start-room',
    1
  ),
  (
    8,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H8.jpg',
    'Hotel-room',
    1
  ),
  (
    9,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H9.jpg',
    'Hotel-kitchen',
    1
  ),
  (
    10,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel1/H10.jpg',
    'Hotel-entrada2',
    1
  ),
  (
    11,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H1.jpg',
    'Hotel-entrada',
    2
  ),
  (
    12,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H2.jpg',
    'Hotel-sala',
    2
  ),
  (
    13,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H3.jpg',
    'Hotel-sala2',
    2
  ),
  (
    14,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H4.jpg',
    'Hotel-sala3',
    2
  ),
  (
    15,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H5.jpg',
    'Hotel-banio',
    2
  ),
  (
    16,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H6.jpg',
    'Hotel-room',
    2
  ),
  (
    17,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H7.jpg',
    'Hotel-start-room',
    2
  ),
  (
    18,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H8.jpg',
    'Hotel-room',
    2
  ),
  (
    19,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel2/H9.jpg',
    'Hotel-kitchen',
    2
  ),
--  (
--    20,
--    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H1.jpg',
--    'Hotel-entrada2',
--    5
--  ),
  (
    21,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H2.jpg',
    'Hotel-entrada',
    5
  ),
  (
    22,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H3.jpg',
    'Hotel-sala',
    5
  ),
  (
    23,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H4.jpg',
    'Hotel-sala2',
    5
  ),
  (
    24,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H5.jpg',
    'Hotel-sala3',
    5
  ),
  (
    25,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H6.jpg',
    'Hotel-banio',
    5
  ),
  (
    26,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H7.jpg',
    'Hotel-room',
    5
  ),
  (
    27,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H8.jpg',
    'Hotel-start-room',
    5
  ),
  (
    28,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H9.jpg',
    'Hotel-room',
    5
  ),
  (
    29,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Hotel3/H10.jpg',
    'Hotel-kitchen',
    5
  ),
  (
    30,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F1.jpg',
    'Flat-entrada2',
    6
  ),
  (
    31,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F2.jpg',
    'Flat-entrada',
    6
  ),
  (
    32,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F3.jpg',
    'Flat-sala',
    6
  ),
  (
    33,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F4.jpg',
    'Flat-sala4',
    6
  ),
  (
    34,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F5.jpg',
    'Flat-sala3',
    6
  ),
  (
    35,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F6.jpg',
    'Flat-banio',
    6
  ),
  (
    36,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F7.jpg',
    'Flat-room',
    6
  ),
  (
    37,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F8.jpg',
    'Flat-start-room',
    6
  ),
  (
    38,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F9.jpg',
    'Flat-room',
    6
  ),
  (
    39,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F10.jpg',
    'Flat-kitchen',
    6
  ),
  (
    40,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat1/F11.jpg',
    'Flat-entrada2',
    6
  ),
  (
    41,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F1.jpg',
    'Flat-entrada2',
    7
  ),
  (
    42,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F1.jpg',
    'Flat-entrada',
    7
  ),
  (
    43,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F2.jpg',
    'Flat-sala',
    7
  ),
  (
    44,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F3.jpg',
    'Flat-sala4',
    7
  ),
  (
    45,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F4.jpg',
    'Flat-sala3',
    7
  ),
  (
    46,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F5.jpg',
    'Flat-banio',
    7
  ),
  (
    47,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F6.jpg',
    'Flat-room',
    7
  ),
  (
    48,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F7.jpg',
    'Flat-start-room',
    7
  ),
  (
    49,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F8.jpg',
    'Flat-room',
    7
  ),
  (
    50,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H1.jpg',
    'House-entrada2',
    8
  ),
  (
    51,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H2.jpg',
    'House-entrada2',
    8
  ),
  (
    52,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H3.jpg',
    'House-entrada',
    8
  ),
--  (
--    53,
--    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H4.jpg',
--    'House-sala',
--    8
--  ),
  (
    54,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H5.jpg',
    'House-sala4',
    8
  ),
  (
    55,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H6.jpg',
    'House-sala3',
    8
  ),
--  (
--    56,
--    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H7.jpg',
--    'House-banio',
--    8
--  ),
  (
    57,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H8.jpg',
    'House-room',
    8
  ),
  (
    58,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H1.jpg',
    'House-start-room',
    9
  ),
  (
    59,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H2.jpg',
    'House-room',
    9
  ),
  (
    60,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H3.jpg',
    'House-start-room',
    9
  ),
  (
    61,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H4.jpg',
    'House-room',
    9
  ),
--  (
--    62,
--    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H5.jpg',
--    'House-start-room',
--    9
--  ),
  (
    63,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H6.jpg',
    'House-room',
    9
  ),
  (
    64,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H7.jpg',
    'House-start-room',
    9
  ),
  (
    65,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H8.jpg',
    'House-room',
    9
  ),
  (
    66,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House2/H9.jpg',
    'House-room',
    9
  ),
  (
    67,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C1.jpg',
    'Camp-room',
    10
  ),
--  (
--    68,
--    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C2.jpg',
--    'Camp-room',
--    10
--  ),
--  (
--    69,
--    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C3.jpg',
--    'Camp-room',
--    10
--  ),
--  (
--    70,
--    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C4.jpg',
--    'Camp-room',
--    10
--  ),
  (
    71,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C5.jpg',
    'Camp-room',
    10
  ),
  (
    72,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C6.jpg',
    'Camp-room',
    10
  ),
  (
    73,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C7.jpg',
    'Camp-room',
    10
  ),
  (
    74,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C8.jpg',
    'Camp-room',
    10
  ),
  (
    75,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C9.jpg',
    'Camp-room',
    10
  ),
  (
    76,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp1/C10.jpg',
    'Camp-room',
    10
  ),
  (
    77,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C1.jpg',
    'Camp-room',
    11
  ),
  (
    78,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C2.jpg',
    'Camp-room',
    11
  ),
  (
    79,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C3.jpg',
    'Camp-room',
    11
  ),
  (
    80,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C4.jpg',
    'Camp-room',
    11
  ),
  (
    81,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C5.jpg',
    'Camp-room',
    11
  ),
  (
    82,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C6.jpg',
    'Camp-room',
    11
  ),
  (
    83,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C7.jpg',
    'Camp-room',
    11
  ),
  (
    84,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C8.jpg',
    'Camp-room',
    11
  ),
  (
    85,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C9.jpg',
    'Camp-room',
    11
  ),
  (
    86,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C10.jpg',
    'Camp-room',
    11
  ),
  (
    87,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Camp2/C11.jpg',
    'Camp-room',
    11
  ),
  (
    88,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F1.jpg',
    'Flat-entrada',
    3
  ),
  (
    89,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F2.jpg',
    'Flat-sala',
    3
  ),
  (
    90,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F3.jpg',
    'Flat-sala4',
    3
  ),
  (
    91,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F4.jpg',
    'Flat-sala3',
    3
  ),
  (
    92,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F5.jpg',
    'Flat-banio',
    3
  ),
  (
    93,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F6.jpg',
    'Flat-room',
    3
  ),
  (
    94,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F7.jpg',
    'Flat-start-room',
    3
  ),
  (
    95,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/Flat2/F8.jpg',
    'Flat-room',
    3
  ),
  (
    96,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H1.jpg',
    'House-entrada2',
    4
  ),
  (
    97,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H2.jpg',
    'House-entrada2',
    4
  ),
  (
    98,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H3.jpg',
    'House-entrada',
    4
  ),
  (
    99,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H4.jpg',
    'House-sala',
    4
  ),
  (
    100,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H5.jpg',
    'House-sala4',
    4
  ),
  (
    101,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H6.jpg',
    'House-sala3',
    4
  ),
  (
    102,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H7.jpg',
    'House-banio',
    4
  ),
  (
    103,
    'https://devsclan-test-s3.s3.sa-east-1.amazonaws.com/House1/H8.jpg',
    'House-room',
    4
  );

INSERT INTO
  `dh`.`imagen_sequence` (`next_val`)
VALUES
  (104);

INSERT INTO
  `dh`.`caracteristicas` (`id`, `name`, `icon`)
VALUES
  (
    1,
    'Wifi gratis',
    'fas fa-wifi'
  ),
  (
    2,
    'Camas sencillas',
    'fas fa-bed'
  ),
  (
    3,
    'Piscina',
    'fas fa-swimmer'
  ),
  (
    4,
    'Cerca a la playa',
    'fas fa-umbrella-beach'
  ),
  (
    5,
    'Cable',
    'fas fa-tv'
  ),
  (
    6,
    'Bar',
    'fas fa-glass-cheers'
  ),
  (
    7,
    'Restaurante',
    'fas fa-utensils'
  ),
  (
    8,
    'Cerca a la ciudad',
    'fas fa-city'
  ),
  (
    9,
    'Transporte',
    'fas fa-bus'
  );

INSERT INTO
  `dh`.`caracteristica_sequence` (`next_val`)
VALUES
  (10);

INSERT INTO
  `dh`.`productos_caracteristicas` (`id_productos`, `id_caracteristicas`)
VALUES
(1,1),
(1,2),
(1,3),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(2,1),
(2,2),
(2,3),
(2,5),
(2,6),
(2,7),
(2,8),
(2,9),
(3,1),
(3,2),
(3,3),
(3,5),
(3,6),
(3,7),
(3,8),
(3,9),
(4,1),
(4,2),
(4,3),
(4,5),
(4,6),
(4,7),
(4,8),
(4,9),
(5,1),
(5,2),
(5,3),
(5,5),
(5,6),
(5,7),
(5,8),
(5,9),
(6,1),
(6,2),
(6,3),
(6,4),
(6,5),
(6,6),
(6,7),
(6,8),
(6,9),
(7,1),
(7,3),
(7,5),
(7,6),
(7,7),
(7,8),
(7,9),
(8,1),
(8,2),
(8,3),
(8,5),
(8,6),
(8,7),
(8,8),
(8,9),
(9,1),
(9,3),
(9,5),
(9,7),
(9,8),
(9,9),
(10,1),
(10,2),
(10,3),
(10,5),
(10,6),
(10,7),
(10,9),
(11,1),
(11,2),
(11,5),
(11,6),
(11,7),
(11,8),
(11,9);

INSERT INTO `dh`.`roles`
(`name`)
VALUES
("ADMIN");

INSERT INTO `dh`.`usuarios`
(`id`,
`email`,
`last_name`,
`name`,
`password`,
`rol_id`)
VALUES
(1,
"admin@a.co",
"Admin",
"Admin",
"$2a$10$JPTLsXpNxICoreg8H5uec.VCDQrarM45TVxfn9xaw1ORF8pPLqJ3S",
2);

INSERT INTO `dh`.`usuario_sequence`
(`next_val`)
VALUES
(2);

INSERT INTO `dh`.`booking_sequence`
(`next_val`)
VALUES
(1);

-- -----------------------------------------------------
-- Table `dh`.`favorite_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`favorite_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `dh`.`favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dh`.`favoritos` (
  `id` INT NOT NULL,
  `producto_id` INT NULL DEFAULT NULL,
  `usuario_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKrxdxytf48cr005vej8540b0rr` (`producto_id` ASC) VISIBLE,
  INDEX `FKq9wif2hcqfxj8t49wo613wm0h` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `FKq9wif2hcqfxj8t49wo613wm0h`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `dh`.`usuarios` (`id`),
  CONSTRAINT `FKrxdxytf48cr005vej8540b0rr`
    FOREIGN KEY (`producto_id`)
    REFERENCES `dh`.`productos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `dh`.`favorite_sequence`
(`next_val`)
VALUES
(1);
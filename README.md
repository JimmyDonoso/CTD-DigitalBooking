# Certified Tech Dev - Proyecto Integrador
## <img src="https://media.giphy.com/media/WO5Wpjsmvux02BGTlt/giphy.gif" width="25"> Navegación en la página

Al navegar a través de la página se tuvo en cuenta cierto criterio para la lógica de negocios:
* El user rol ADMIN no tiene habilitado poder realizar reservas, deberá tener una cuenta convencional con rol USER.
* Al filtrar resultados se considero que resulta ilógico realizar una búsqueda solo por fechas ya que el cliente generalmente ya tiene definido un destino antes de emprender la búsqueda.
* El user rol USER no tiene habilitado realizar anuncios de alojamiento nuevo.
* Al registrarse no se logea automáticamente, consideramos que resulta más lógico requerir logearse luego del registro para mayor seguridad.
* Se crearon rutas privadas y públicas para evitar el uso de las URL para acceder sin rol a ciertas páginas, así también como recargar bruscamente las páginas se genera un bloqueo de la misma.

## <img src="https://media.giphy.com/media/WO5Wpjsmvux02BGTlt/giphy.gif" width="25"> General
Para el desarrollo de este proyecto se recomienda:
* PC con 8Gb RAM mínimo y 1Gb de almacenamiento única para el proyecto.
* Tener una cuenta en la plataforma de GitLab para el control de versiones.
* Contar con git instalado en la computadora, desde Windows se recomienda contar con un emulador como GitBASH.
* Se recomienda trabajar en navegadores como Chrome o Firefox.
* La carpeta de trabajo se encuentra dividida por áreas, y para acceder a cada una solo basta con especificar el nombre de la ruta. Los cambios se fueron realizando dentro de la rama dev y las entregas de cada sprint se mergeaban en la rama main como completado.

## <img src="https://media.giphy.com/media/WO5Wpjsmvux02BGTlt/giphy.gif" width="25"> Frontend
Desde el área de Frontend se especifican los siguientes requerimientos de software: 
* Node.js
* React.js
* IDEs: Visual Studio Code

Algunas consideraciones:

Se trabajo con la biblioteca de React armando los componentes principales en jsx y trabajando con componentes auxiliares en js. A partir de la ejecución de "npm install" se podrá acceder al package actualizado con todas las librerías y funcionalidades aplicadas. Se acordó mantener unificados los documentos bajo declaraciones en inglés. El componente App.js reúne todas las rutas y componentes implicados en el proyecto.


## <img src="https://media.giphy.com/media/WO5Wpjsmvux02BGTlt/giphy.gif" width="25"> Backend
Desde el área de Backend se especifican los siguientes requerimientos de software: 
* Java
* IDEs: Intellij IDEA

Algunas consideraciones:

Se trabajo con Spring Framework moderando el proyecto a través de Spring Boot. Es recomendable mantener actualizado el pom.xml, el cual contiene las dependencias requeridas para la funcionalidad completa del proyecto. Se acordó mantener unificados los documentos bajo declaraciones en inglés. El proyecto se desarrolló aplicando patrón MVC para su estructuración.

## <img src="https://media.giphy.com/media/WO5Wpjsmvux02BGTlt/giphy.gif" width="25"> Base de datos
Desde el área de Base de datos se especifican los siguientes requerimientos de software: 
* MySQL
* IDEs: MySQL Workbench

Algunas consideraciones:

Se trabajo con SQL manipulando los datos a través de querys en MySQL Workbench. Es recomendable mantener actualizada la query, la cual contiene todos los datos preestablecidos y almacenados en la base, requeridas para la funcionalidad completa del proyecto. Se acordó mantener unificados los datos nombrándolos en español para mejor entendimiento de tablas.

## <img src="https://media.giphy.com/media/WO5Wpjsmvux02BGTlt/giphy.gif" width="25"> Infraestructura
Desde el área de Infraestructura se especifican los siguientes requerimientos: 
* Cuenta cliente en AWS(Amazon Web Services)
* Docker
* Terraform

Algunas consideraciones:

Trabajamos desde AWS creando tanto los recursos como la base datos, las instancias y el S3 bucket como nuestra vpc, las subnets y la key para acceer por ssh mediante terraform, para todos los miembros del grupo puedan ver los cambios que se hacen en la infraestructura y trabajar en lo que se vea necesario.


## <img src="https://media.giphy.com/media/WO5Wpjsmvux02BGTlt/giphy.gif" width="25"> Testing
El testing fue una herramienta clave durante el proyecto, nos permitió afirmar cada uno de nuestros pasos en cada sprint, nos comprometimos en hacer test sólidos que generan confianza en nuestro código, aunque sabemos que la prueba exhaustiva no existe al igual que la ausencia de errores.

Link del informe final: [Reporte final de Testing](https://docs.google.com/document/d/1Fip6v_XywmPBOfBlESq56cVm5_TOIut8oB4qF7pySqY/edit?usp=sharing)

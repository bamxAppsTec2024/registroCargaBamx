# Food Donation Registration and History App for Banco de Alimentos (BAMX) Food Bank  

## APK Build Link  
https://expo.dev//accounts/bamx/projects/registroCargaBamx/builds/e68479dc-6da9-4d64-a91c-026c564095d7  

## Process to Digitalize
En el ámbito operativo se compartió el proceso en el que las y los conductores de los
camiones evalúan si el donativo que se les proporciona al banco es apto para consumo
(si es que aplica). En caso de que no lo sea, se descarta y no se traslada al banco. Para
tener evidencia de este proceso, la o el conductor toma una fotografía de la carga y
redacta un correo electrónico, adjuntando la imagen. No obstante, también existen
casos en los que las instituciones donantes no permiten que la o el conductor vea la
carga, a esto se le conoce como “carga ciega”.  

Este proceso tiene un alto impacto operativo, describió el encargado de operaciones
del BAMX Omar Cañedo, debido a que, en caso de que se tengan rutas saturadas la o
el conductor podrá conocer qué donantes son los que proveen donativos en mejor
estado para priorizarlos.  

### Current Process' Diagram
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/9a9248e5-4b6a-45d2-8571-6f3d31fccc40)


### Proposed Process' Diagram
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/f90b1343-dbaa-4bde-84d6-1f81a9cfceec)
En el diagrama de actividad anterior se muestran los tres actores involucrados en el
proceso actual del registro de la carga, los cuales son la o el conductor, el dispositivo
celular y la nube. El proceso consiste en que una vez que la o el conductor llega al
punto de recolección, si la carga es un alimento, evalúa si es comestible o no.
Posteriormente, toma una fotografía con su celular y se almacena en su camera roll.
Después, abre la aplicación del correo electrónico, redacta por qué la carga se
descarta y adjunta la fotografía que tomó. Por último, envía el correo electrónico al
destinatario correspondiente, realizando la petición al servidor del correo y si el
estatus de la respuesta es exitoso se ejecuta la acción, si no, se muestra el mensaje
de error.  

## Data Sheet 
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/b2c13189-b8b1-4043-8352-fbf632e7a88c)

## Goals
Objetivos a alcanzar con la transformación digital del proceso
Los objetivos de utilizar la transformación digital en este proceso son:  
● Mantener un historial de los registros que sea preciso mediante una
metodología más organizada y sencilla.  
● Eficientar el registro de la carga a través de una UI/UX con un alto nivel de
usabilidad considerando que las y los usuarios, quienes son conductores de los
camiones, recorren alrededor de 15 puntos, llenan el camión y deben registrar
la carga.  

## WBS Diagram   
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/493a27de-0202-419c-81cc-6c2ab7618c41)

## Gantt Diagram  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/a172f66c-76f2-4ec0-987a-b97bdcda894e)

## Mockup UI  
Link al Figma:  
https://www.figma.com/file/DkHMkERrLdof25d7GmVhgu/BAMX-Carga?type=desi
gn&node-id=0%3A1&mode=design&t=3VwU9xG0iyPxaMpW-1  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/2abe419a-4d94-4d59-aae2-b3e01eabc0c3)

## Actual Interfaces
Empty Form   
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/aa2c84bc-4454-42da-89d8-72f11d3cd2a2)


Filled out form  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/17371799-ec51-4ced-a090-fd6fcd78532b)
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/52cd4559-ed37-4445-9380-3ff8e08b98d5)

Camera interface  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/6cfdc3ce-81a7-48bb-b170-be967e6c4cf6)

Form validations  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/ea5b2360-7a7d-4a72-8aae-5523142f3f84)

"Other" dropdown  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/f419df49-bfd8-46b9-8b79-14efec0b1ac8)

Fields shown to add a new driver, donor, donation, and waste reason  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/aeac481d-260b-49e6-8540-75d76bc050e2)

Validations of fields to add new driver, donor, donation, and waste reason  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/e4cd08d8-b930-4f70-8a85-7c1b20c96640)
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/8a884b7e-354c-49b5-95c1-46d6e665db9f)

New donor added to the dropdown after submitting the form  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/44d3e42f-1653-433e-b45f-a889a70e0508)

Blind load option  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/bb874ecb-2cc1-45aa-8190-c5955cb24f8b)

Photo validation  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/e045a906-cfae-41f2-9add-e55d4cbe3f44)

Sending legend on submit  
![image](https://github.com/bamxAppsTec2024/registroCargaBamx/assets/67821436/9e0b4435-aebb-4e45-90f9-ae0ac261d037)

## Suggested updates  
### Posibles cambios o mantenimiento a 1 año:   
Recibir retroalimentación por parte de las y los operadores de los camiones para realizar
mejoras en UI/UX. Llevar a cabo actualizaciones en la aplicación de acuerdo con los
comentarios recibidos. Algunos cambios pueden involucrar añadir o reemplazar campos en el
formulario.  

Implementar mejoras al código en cuanto a requerimientos no funcionales como seguridad y
performance dependiendo de la necesidades que se hayan identificados tras el uso de la
aplicación.  

Para hacer el despliegue de manera automatizada se propone utilizar a futuro GitHub Actions,
mediante esto se generará el APK cuando se realice un release. Particularmente, se encontró
la siguiente GitHub Action en el Marketplace de GitHub que permite hacer build para
Android generando un APK con React Native Expo (GitHub, Inc., 2024a).  

### Posibles cambios o mantenimiento a 3 años:  
Desarrollar una página web con perfil de administrador para mostrar los datos mediante
gráficas y tablas en un dashboard.  

En cuanto a la aplicación, se deberían realizar actualizaciones de las dependencias utilizadas
para evitar errores.  

### Posibles cambios o mantenimiento a 5 años:  
Crear módulo en la aplicación que sugiera rutas a partir de la serie de puntos de recolección
que se visitarán con base en la información histórica de las y los donantes que proveen mejor
producto (con menor desperdicio) para reducir la merma.  

### Recomendaciones:  
- Colaborar con una o un especialista en UI/UX que pueda brindar una consultoría para
mejorar la aplicación.  
- Para el dashboard, determinar qué indicadores brindan mayor información al
momento de realizar un análisis sobre los datos obtenidos en el registro de carga más
allá de solo mostrar el historial.  
- Considerar utilizar una herramienta de visualización de datos como Tableau.  
- Determinar las variables que establecerán qué punto de recolección tiene mayor
prioridad en la ruta, algunos ejemplos son distancia, posicionamiento en la lista de
mejores donantes, proveen carga ciega y tiempo de carga.
 
## References  
GitHub, Inc. (2024a). Build Android release APK with EXPO. Recuperado de
https://github.com/marketplace/actions/build-android-release-apk-with-expo  
GitHub, Inc. (2024b). Planes de GitHub. Recuperado de
https://docs.github.com/es/get-started/learning-about-github/githubs-plans  

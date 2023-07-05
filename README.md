# Shop-Express-Mongoose

<a name="readme-top"></a>

# Huge Pharma

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#components-used-in-the-project">Components Used In The Project</a></li>
    <li><a href="#roles-in-project">Roles In Project</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#database-scheme">DataBase Scheme</a></li>
  </ol>
</details>

## About The Project

***
Huge Pharma is an online pharmacy.\
Client selects the required drug and specific implementation of this drug from the list of available ones.
Adds the drug to shopping cart. Then customer selects from the cart items he wants to order
at the moment and specifies their quantity. It's also possible to specify another payment card,
contact number and delivery address during checkout. During the order, the availability of funds
on the user's account and availability of prescriptions for drugs requiring them are checked.
Ordered items are removed from the cart. Pharmacist manages the list of drugs
and processes requests from users to add drugs requiring a doctor's prescription
to their electronic prescriptions. Administrator manages the list of users,
and also views all completed orders and user applications for adding drugs to electronic prescriptions.
All users can change the language.

### Built With

* [![Spring_Boot][Spring_Boot.com]][Spring_Boot-url]
* [![Thymeleaf][Thymeleaf.com]][Thymeleaf-url]
* [![MySQL][MySQL.com]][MySQL-url]
* [![Tomcat][Tomcat.com]][Tomcat-url]
* [![Eclipse][Eclipse.com]][Eclipse-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

***

- Implementation of Authentication and Authorization with Spring Security
- Pagination, search and sort on various pages for the best user experience
- Different databases for tests and production
- Internationalization
- Use of Spring AOP for logging
- CSRF Protection
- Storing hashed passwords in database

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Components Used In The Project:

***

- Java 17
- Spring Boot 3.0.5
- Maven
- Git
- Thymeleaf
- Database: MySQL / H2 (for tests)
- Server / Servlet container: Tomcat 10
- Liquibase
- Spring Data JPA
- Logger: Logback
- Tests: JUnit 5
- ModelMapper
- Lombok

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roles In Project

***

### All users (including unauthorised)

- Change language
- View all products with pagination changing the number of products per page
- View all product implementations
- Search products by different fields
- Sort products by different fields
- Sign in
- Sign up

### Authorised users (clients, pharmacists, administrators)

- View products in cart, add products to cart, remove products from cart
- Order individual items from the cart specifying the quantity of each item
- View and edit information in personal account
- View personal prescriptions
- View personal prescription requests / add new prescription requests
- View personal purchase history
- Logout

### Only pharmacists

- Crud operations with producers, medicines and medicine products
- View and process (approve or dismiss) users prescription requests

### Only administrators

- Crud operations with users
- View purchase history and prescription requests of all users

***
- __Pharmacist:__ id = `1000000000000001`, login = `Carol602`, password = `qwertyQWERTY1!`
- __Administrator:__ id = `1000000000000006`, login = `admin`, password = `testTEST2&`
- __Client:__ id = `1000000000000007`, login = `Benjamin334`, password = `abcdABCD3#`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshots

***

### Main Page:
![main-page]
### Cart Page:
![cart-page]
### Login Page:
![login-page]
### Pharmacist Medicines Page:
![pharmacist-medicines-page]
### Pharmacist Prescription Requests Page:
![pharmacist-prescription-requests-page]
### Administrator Users Page:
![administrator-users-page]
### Page Not Found:
![page-not-found]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## DataBase Scheme

***
![database-schema]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Spring_Boot.com]: https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot
[Spring_Boot-url]: https://spring.io/projects/spring-boot
[Thymeleaf.com]: https://img.shields.io/badge/Thymeleaf-%23005C0F.svg?style=for-the-badge&logo=Thymeleaf&logoColor=white
[Thymeleaf-url]: https://www.thymeleaf.org/
[MySQL.com]: https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Tomcat.com]: https://img.shields.io/badge/apache%20tomcat-%23F8DC75.svg?style=for-the-badge&logo=apache-tomcat&logoColor=black
[Tomcat-url]: https://tomcat.apache.org/
[Eclipse.com]: https://img.shields.io/badge/Eclipse-FE7A16.svg?style=for-the-badge&logo=Eclipse&logoColor=white
[Eclipse-url]: https://www.eclipse.org/

[main-page]:project-info/main_page.png
[cart-page]:project-info/cart_page.png
[login-page]:project-info/login_page.png
[pharmacist-medicines-page]:project-info/pharmacist_medicines_page.png
[pharmacist-prescription-requests-page]:project-info/pharmacist_prescriptionRequests_page.png
[administrator-users-page]:project-info/administrator_users_page.png
[page-not-found]:project-info/page_not_found.png
[database-schema]:project-info/pharmacy_db.png

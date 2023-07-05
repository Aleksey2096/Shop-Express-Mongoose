# Shop-Express-Mongoose

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
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#database-scheme">DataBase Scheme</a></li>
  </ol>
</details>


***
# Content
+ [Предметная область (кратко)](#предметная_область)
+	[Описание функциональности](#функциональность)
+	[Применяемые технологии](#технологии)
+	[Реализованные требования](#требования)
+	[DataBase Scheme](#database-scheme)
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
***
### Components used in the project:
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
***
## Roles in project
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
## DataBase Scheme
![img](project-info/pharmacy_db.png)

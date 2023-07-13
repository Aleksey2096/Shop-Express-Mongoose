<a name="readme-top"></a>

# SimonsTarget

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
    <li><a href="#project-setup">Project Setup</a></li>
  </ol>
</details>

## About The Project

SimonsTarget Inc. - e-commerce website, that facilitates consumer-to-consumer and business-to-consumer sales.\
Client selects required product from the list of available ones.
Adds the product to shopping cart. Then customer specifies quantity of the items in cart and orders them. It's also possible to specify another email and payment card information during checkout.
Ordered items are removed from the cart. Client manages the list of his own products. 
Administrator views all users, block/unblock them and also views all completed orders.

### Built With

* [![Express][Express.com]][Express-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]
* [![Node][Node.com]][Node-url]
* [![NPM][NPM.com]][NPM-url]
* [![Nodemon][Nodemon.com]][Nodemon-url]
* [![VSCode][VSCode.com]][VSCode-url]
* [![Stripe][Stripe.com]][Stripe-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- Implementation of Authentication and Authorization
- Pagination on various pages for the best user experience
- Password change is done via email using a temporary token
- Creation of order invoices in pdf format
- Payments are made through Stripe api
- CSRF Protection
- Storing hashed passwords in database
- Compressing assets with Compression
- Request logging with Morgan

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Components Used In The Project:

- nodemon 1.14.9
- bcryptjs 2.4.3
- body-parser 1.20.2
- connect-flash 0.1.1
- connect-mongodb-session 3.1.1
- csurf 1.11.0
- ejs 3.1.9
- express 4.18.2
- express-session 1.17.3
- express-validator 7.0.1
- mongoose 5.13.19
- multer 1.4.4
- nodemailer 6.9.3
- pdfkit 0.8.3
- stripe 12.10.0

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roles In Project

### All users (including unauthorised)

- View all products with pagination
- View product details
- Sign in
- Sign up

### Authorised users (clients, administrators)

- View products in cart, add products to cart, remove products from cart
- Order products from the cart specifying the quantity of each item
- View personal purchase history
- Create invoice in pdf format for any of your orders
- Crud operations with your own products
- Change password
- Logout

### Only administrators

- View all users
- Block/Unblock any user
- View purchase history of all users

***

- __Administrator:__ email = `admin@admin.admin`, password = `admin`
- __Client:__ email = `alexward2096@gmail.com`, password = `111111`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshots

### Login Page:

![login_page]

### Signup Page:

![signup_page]

### Home Page:

![home_page]

### Product Details Page:

![product_details_page]

### Cart Page:

![cart_page]

### Checkout Page:

![checkout_page]

### Stripe Payment Page:

![stripe_payment_page]

### Orders Page:

![orders_page]

### Invoice PDF:

![invoice_pdf]

### Add Product Page:

![add_product_page]

### User Products Page:

![user_products_page]

### Administrator Orders Page:

![administrator_orders_page]

### Administrator Users Page:

![administrator_users_page]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Setup

### 1. Clone the repository
```
$ git clone https://github.com/Aleksey2096/Shop-Express-Mongoose.git
```

### 2. Install NPM packages
```
npm install
```

### 3.1 Start server
```
npm start-server
```

### 3.2 Start server with hot-reloads for development
```
npm start
```

### Run your tests
```
npm test
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Express.com]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white

[Express-url]: https://expressjs.com/

[Node.com]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white

[Node-url]: https://nodejs.org/en

[NPM.com]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white

[NPM-url]: https://www.npmjs.com/

[MongoDB.com]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white

[MongoDB-url]: https://www.mongodb.com/

[Stripe.com]: https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white

[Stripe-url]: https://stripe.com/

[VSCode.com]: https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white

[VSCode-url]: https://code.visualstudio.com/

[Nodemon.com]: https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD

[Nodemon-url]: https://nodemon.io/


[login_page]:project-info/login_page.png
[signup_page]:project-info/signup_page.png
[home_page]:project-info/home_page.png
[product_details_page]:project-info/product_details_page.png
[cart_page]:project-info/cart_page.png
[checkout_page]:project-info/checkout_page.png
[stripe_payment_page]:project-info/stripe_payment_page.png
[orders_page]:project-info/orders_page.png
[invoice_pdf]:project-info/invoice_pdf.png
[add_product_page]:project-info/add_product_page.png
[user_products_page]:project-info/user_products_page.png
[administrator_orders_page]:project-info/administrator_orders_page.png
[administrator_users_page]:project-info/administrator_users_page.png

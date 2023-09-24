# TABLE DEFINITIONS
    1.  ui.product_description is linked to ui.products
            That is: 
                delete info from ui.product from database, will delete info in item description table from ui.description as well.

    2.  ui.ordered_items is linked to ui.checkout table
        That is : 
                delete info from checkout table from database, will delete info in ordered_item  table as well.

    3.  


# TABLES
## table for Product
CREATE TABLE IF NOT EXISTS ui.products (
	id BIGSERIAL NOT NULL,
	product_code VARCHAR(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
	price VARCHAR(50) NOT NULL,
	price_del VARCHAR(50) NOT NULL,
    star_rated VARCHAR(50) NOT NULL,
    seller VARCHAR(50) NOT NULL,
    category_all VARCHAR(50) NOT NULL,
    sub_category VARCHAR(50) NOT NULL,
    price_ftr VARCHAR(50) NOT NULL,
    img VARCHAR(50) NOT NULL,
	date_created VARCHAR(15) NOT NULL,
    time_created VARCHAR(15) NOT NULL,
    PRIMARY KEY (id, product_code),
    UNIQUE (product_code)
);

## table for Checkout
CREATE TABLE IF NOT EXISTS ui.checkout (
    id BIGSERIAL NOT NULL,
    checkout_code VARCHAR(20) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    tel VARCHAR(15) NOT NULL,
    company VARCHAR(50),
    region VARCHAR(50) NOT NULL, 
    city VARCHAR(20),
    residential VARCHAR(50),
    digital VARCHAR(15),
    delivery VARCHAR(20) NOT NULL,
    payment VARCHAR(20) NOT NULL,
    date_created VARCHAR(15) NOT NULL,
    time_created VARCHAR(15) NOT NULL,
    PRIMARY KEY (id, checkout_code),
    UNIQUE (checkout_code)
);

## table for Ordered_items
CREATE TABLE IF NOT EXISTS ui.ordered_items (
    id BIGSERIAL NOT NULL,
    product_code VARCHAR(20) NOT NULL,
    checkout_code VARCHAR(20) NOT NULL REFERENCES ui.checkout (checkout_code) ON DELETE CASCADE,
    title VARCHAR(50) NOT NULL,
	price VARCHAR(50) NOT NULL,
	quantity VARCHAR(15) NOT NULL,
    total VARCHAR(15) NOT NULL,
	date_created VARCHAR(15) NOT NULL,
    time_created VARCHAR(15) NOT NULL,
    img_url VARCHAR(200) NOT NULL,
    PRIMARY KEY (id, product_code, checkout_code)
);

## table for Product Descriptions
CREATE TABLE IF NOT EXISTS ui.product_descriptions (
    id BIGSERIAL NOT NULL,
	product_code VARCHAR(20) NOT NULL REFERENCES ui.products (product_code) ON DELETE CASCADE,
    title VARCHAR(50) NOT NULL,
	price VARCHAR(50) NOT NULL,
	stock VARCHAR(50) NOT NULL,
    star_rated VARCHAR(50) NOT NULL,
    seller VARCHAR(50) NOT NULL,
    made_by VARCHAR(50),
    material VARCHAR(50),
    dimension VARCHAR(50),
    ship_cost VARCHAR(50) NOT NULL,
    return_status VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    img VARCHAR(50) NOT NULL,
    img_sort_1 VARCHAR(50) NOT NULL,
    img_sort_2 VARCHAR(50) NOT NULL,
    img_sort_3 VARCHAR(50) NOT NULL,
    img_sort_4 VARCHAR(50) NOT NULL,
    img_sort_5 VARCHAR(50) NOT NULL,
    img_sort_6 VARCHAR(50) NOT NULL,
	date_created VARCHAR(15) NOT NULL,
    time_created VARCHAR(15) NOT NULL,
    PRIMARY KEY (id, product_code)
);

##  table for users
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS ui.users (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    full_name VARCHAR(100),
    tel VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    date_created VARCHAR(15) NOT NULL,
    time_created VARCHAR(15) NOT NULL,
    salt VARCHAR(200) NOT NULL,
    PRIMARY KEY (id, user_name, email),
    UNIQUE (user_name, email)
);

## create uploaded image table 
CREATE TABLE IF NOT EXISTS ui.user_images (
    id BIGSERIAL NOT NULL,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(50),
    format VARCHAR(50),
    size VARCHAR(50),
    PRIMARY KEY (id, email)
);

## create session table
CREATE TABLE IF NOT EXISTS ui.user_sessions (
    sid VARCHAR(200) NOT NULL,
    sess JSON NOT NULL,
    expire TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (sid)
);

## create google 0auth 2.0  table
CREATE TABLE IF NOT EXISTS ui.user_google (
    id VARCHAR(200) NOT NULL,
    surname VARCHAR(50),
    other_names VARCHAR(100),
    email VARCHAR(200) NOT NULL,
    email_verified VARCHAR(50),
    tel VARCHAR(50),
    pic VARCHAR(200),
    date_created VARCHAR(100),
    time_created VARCHAR(100),
    PRIMARY KEY (id, email), 
    UNIQUE (email)
);

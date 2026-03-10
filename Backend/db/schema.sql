-- Creacion de la base de datos
CREATE DATABASE megaburguer;

-- Conectarse
\c megaburguer;

-- Tablas
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT,
    price INTEGER NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_offer BOOLEAN DEFAULT false,
    category VARCHAR(50),
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    id_product INTEGER REFERENCES products(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    direction TEXT,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE details (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_price INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'en pedido',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar productos de ejemplo
INSERT INTO products (name, ingredients, price, image_url, category, is_featured, is_offer, stock)
VALUES
('Mega Burguer Clasica', 'Pan brioche tostado, doble carne 100% vacuno, queso cheddar derretido, lechuga fresca, tomate y salsa especial Mega.', 9990, "https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg", "Burguers", true, false, 20),
('Combo Mega BBQ', 'Hamburguesa BBQ con papas fritas crujientes y bebida 350ml.', 11990, "https://images.pexels.com/photos/2089717/pexels-photo-2089717.jpeg", 'Combos', false, true, 15),
('Combo Doble Queso', 'Doble carne con doble queso cheddar, papas medianas y bebida.', 10990, "https://images.pexels.com/photos/5908286/pexels-photo-5908286.jpeg", 'Combos', false, true, 10),
('Mega Chicken Burguer', 'Hamburguesa de pollo crispy con lechuga, tomate y mayonesa casera.', 8990, "https://images.pexels.com/photos/9975765/pexels-photo-9975765.jpeg", 'Burguers', false, true, 18),
('Combo Familiar Mega', '4 hamburguesas clásicas, 2 porciones grandes de papas y 4 bebidas.', 24990, "https://images.pexels.com/photos/4021939/pexels-photo-4021939.jpeg", 'Combos', false, true, 5),
('Mega Bacon Burguer', 'Hamburguesa con doble carne, tocino crujiente, queso cheddar y salsa BBQ.', 10490, "https://images.pexels.com/photos/660282/pexels-photo-660282.jpeg", 'Burguers', false, false, 20),
('Triple Mega Burguer', 'Hamburguesa triple carne con triple queso y salsa especial.', 11990, "https://media.istockphoto.com/id/1453739155/es/foto/toma-vertical-de-una-deliciosa-hamburguesa-jugosa-con-triple-hamburguesa-sobre-una-mesa-de.jpg?b=1&s=612x612&w=0&k=20&c=2CYj870Znz_Lqv2zIbrHBArxV6RnKNxdAwAKdirGui4=", 'Burguers', false, false, 15),
('Veggie Burguer', 'Hamburguesa vegetariana con medallón vegetal, palta y vegetales frescos.', 8990, "https://images.unsplash.com/photo-1520072959219-c595dc870360", 'Burguers', false, false, 12),
('Papas Fritas Clasicas', 'Papas fritas crujientes recién hechas.', 2990, "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg", 'Fries', false, false, 40),
('Papas Con Cheddar', 'Papas fritas con abundante queso cheddar.', 3990, "https://media.istockphoto.com/id/1301802151/es/foto/queso-cheddar-vertido-o-tirado-de-las-papas-fritas-fritas-en-la-parte-superior.jpg?b=1&s=612x612&w=0&k=20&c=iQLUDsbIDa007_hVWA-C2Wogy4YHNAIfLU1_AvqFcqQ=", 'Fries', false, false, 30),
('Papas Con Bacon', 'Papas fritas con cheddar derretido y tocino crujiente.', 4490, "https://media.istockphoto.com/id/1303663892/es/foto/patatas-fritas-con-cheddar-y-tocino.jpg?b=1&s=612x612&w=0&k=20&c=ET7skNpkXjhbPOEHoY6eZvXGdGXP69bav0Ao17g3tp4=", 'Fries', false, false, 25),
('Coca-Cola 350ml', 'Bebida Coca Cola clásica 350ml.', 1990, "https://media.istockphoto.com/id/1062831310/es/foto/vierta-el-refresco-en-vaso-con-poco-de-hielo-sobre-fondo-oscuro.jpg?b=1&s=612x612&w=0&k=20&c=h1ntgfXP_ABi2H945DfU8c-di1f1wj12LPrnPPojFTE=", 'Drinks', false, false, 50),
('Sprite 350ml', 'Bebida Sprite refrescante 350ml.', 1990, "https://images.unsplash.com/photo-1592860893757-84536a1c9b82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3ByaXRlfGVufDB8fDB8fHww", 'Drinks', false, false, 50),
('Fanta 350ml', 'Bebida sabor naranja.', 1990, "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFudGF8ZW58MHx8MHx8fDA%3D", 'Drinks', false, false, 50),
('Milkshake Chocolate', 'Milkshake cremoso de chocolate.', 3490, "https://images.unsplash.com/photo-1572490122747-3968b75cc699", 'Drinks', false, false, 20),
('Onion Rings', 'Aros de cebolla crujientes con salsa especial.', 3490, "https://images.unsplash.com/photo-1639024471283-03518883512d", 'Fries', false, false, 25);
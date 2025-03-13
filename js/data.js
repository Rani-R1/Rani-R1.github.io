const products = {
  grocery: [
    {
      id: "g1",
      name: "Fresh Organic Apples",
      price: 4.99,
      image:".\images\products\Grocery\apple.jpeg", 
      rating: 4.5,
      reviews: 128,
    },
    {
      id: "g2",
      name: "Whole Grain Bread",
      price: 3.49,
      image: "./images/products/Grocery/bread.jpeg",
      rating: 4.2,
      reviews: 95,
    },
    {
      id: "g3",
      name: "Organic Milk",
      price: 2.99,
      image: "./images/products/Grocery/milk.jpeg",
      rating: 4.8,
      reviews: 210,
    },
    {
      id: "g4",
      name: "Free-Range Eggs",
      price: 4.49,
      image: "./images/products/Grocery/eggs.jpeg",
      rating: 4.6,
      reviews: 175,
    },
    {
      id: "g5",
      name: "Organic Quinoa",
      price: 6.99,
      image: "./images/products/Grocery/quinoa.jpeg",
      rating: 4.3,
      reviews: 88,
    },
    {
      id: "g6",
      name: "Extra Virgin Olive Oil",
      price: 12.99,
      image: "./images/products/Grocery/oliveoil.png  ",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: "g7",
      name: "Fresh Avocados",
      price: 5.99,
      image: "https://via.placeholder.com/300x300?text=Avocados",
      rating: 4.9,
      reviews: 203,
    },
    {
      id: "g8",
      name: "Organic Honey",
      price: 8.99,
      image: "https://via.placeholder.com/300x300?text=Honey",
      rating: 4.8,
      reviews: 167,
    },
    {
      id: "g9",
      name: "Fresh Spinach",
      price: 3.49,
      image: "https://via.placeholder.com/300x300?text=Spinach",
      rating: 4.4,
      reviews: 112,
    },
    {
      id: "g10",
      name: "Greek Yogurt",
      price: 4.99,
      image: "https://via.placeholder.com/300x300?text=Greek+Yogurt",
      rating: 4.6,
      reviews: 189,
    },
    {
      id: "g11",
      name: "Bananas",
      price: 1.99,
      image: "https://via.placeholder.com/300x300?text=Bananas",
      rating: 4.5,
      reviews: 145,
    },
    {
      id: "g12",
      name: "Ketchup",
      price: 2.49,
      image: "https://via.placeholder.com/300x300?text=Ketchup",
      rating: 4.3,
      reviews: 101,
    }
  ],
  pharmaceutical: [
    {
      id: "p1",
      name: "Multivitamin Tablets",
      price: 15.99,
      image: "https://via.placeholder.com/300x300?text=Multivitamins",
      rating: 4.4,
      reviews: 112,
    },
    {
      id: "p2",
      name: "Pain Relief Tablets",
      price: 7.49,
      image: "https://via.placeholder.com/300x300?text=Pain+Relief",
      rating: 4.6,
      reviews: 203,
    },
    {
      id: "p3",
      name: "First Aid Kit",
      price: 24.99,
      image: "https://via.placeholder.com/300x300?text=First+Aid+Kit",
      rating: 4.8,
      reviews: 87,
    },
    {
      id: "p4",
      name: "Hand Sanitizer",
      price: 3.99,
      image: "https://via.placeholder.com/300x300?text=Hand+Sanitizer",
      rating: 4.5,
      reviews: 176,
    },
    {
      id: "p5",
      name: "Vitamin C Supplements",
      price: 12.99,
      image: "https://via.placeholder.com/300x300?text=Vitamin+C",
      rating: 4.7,
      reviews: 145,
    },
    {
      id: "p6",
      name: "Digital Thermometer",
      price: 19.99,
      image: "https://via.placeholder.com/300x300?text=Thermometer",
      rating: 4.3,
      reviews: 92,
    },
    {
      id: "p7",
      name: "Allergy Relief Medication",
      price: 8.99,
      image: "https://via.placeholder.com/300x300?text=Allergy+Relief",
      rating: 4.5,
      reviews: 134,
    },
    {
      id: "p8",
      name: "Omega-3 Fish Oil",
      price: 14.99,
      image: "https://via.placeholder.com/300x300?text=Fish+Oil",
      rating: 4.6,
      reviews: 167,
    },
    {
      id: "p9",
      name: "Bandages Variety Pack",
      price: 5.99,
      image: "https://via.placeholder.com/300x300?text=Bandages",
      rating: 4.4,
      reviews: 103,
    },
    {
      id: "p10",
      name: "Facial Cleanser",
      price: 9.99,
      image: "https://via.placeholder.com/300x300?text=Facial+Cleanser",
      rating: 4.7,
      reviews: 189,
    },
  ],
  stationery: [
    {
      id: "s1",
      name: "Premium Notebook",
      price: 8.99,
      image: "https://via.placeholder.com/300x300?text=Notebook",
      rating: 4.6,
      reviews: 118,
    },
    {
      id: "s2",
      name: "Gel Pen Set",
      price: 12.49,
      image: "https://via.placeholder.com/300x300?text=Gel+Pens",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: "s3",
      name: "Desk Organizer",
      price: 19.99,
      image: "https://via.placeholder.com/300x300?text=Desk+Organizer",
      rating: 4.4,
      reviews: 83,
    },
    {
      id: "s4",
      name: "Sticky Notes Pack",
      price: 5.99,
      image: "https://via.placeholder.com/300x300?text=Sticky+Notes",
      rating: 4.3,
      reviews: 97,
    },
    {
      id: "s5",
      name: "Scientific Calculator",
      price: 14.99,
      image: "https://via.placeholder.com/300x300?text=Calculator",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "s6",
      name: "Mechanical Pencil Set",
      price: 9.99,
      image: "https://via.placeholder.com/300x300?text=Mechanical+Pencils",
      rating: 4.5,
      reviews: 108,
    },
    {
      id: "s7",
      name: "Binder Clips Assortment",
      price: 4.99,
      image: "https://via.placeholder.com/300x300?text=Binder+Clips",
      rating: 4.2,
      reviews: 76,
    },
    {
      id: "s8",
      name: "Colored Pencil Set",
      price: 11.99,
      image: "https://via.placeholder.com/300x300?text=Colored+Pencils",
      rating: 4.6,
      reviews: 132,
    },
    {
      id: "s9",
      name: "Whiteboard Markers",
      price: 7.99,
      image: "https://via.placeholder.com/300x300?text=Whiteboard+Markers",
      rating: 4.4,
      reviews: 91,
    },
    {
      id: "s10",
      name: "Stapler and Staples Set",
      price: 8.49,
      image: "https://via.placeholder.com/300x300?text=Stapler",
      rating: 4.3,
      reviews: 87,
    },
  ],
  misc: [
    {
      id: "m1",
      name: "Wireless Earbuds",
      price: 49.99,
      image: "https://via.placeholder.com/300x300?text=Earbuds",
      rating: 4.5,
      reviews: 213,
    },
    {
      id: "m2",
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      image: "https://via.placeholder.com/300x300?text=Water+Bottle",
      rating: 4.7,
      reviews: 178,
    },
    {
      id: "m3",
      name: "Board Game Set",
      price: 34.99,
      image: "https://via.placeholder.com/300x300?text=Board+Game",
      rating: 4.6,
      reviews: 95,
    },
    {
      id: "m4",
      name: "Cotton T-Shirt",
      price: 19.99,
      image: "https://via.placeholder.com/300x300?text=T-Shirt",
      rating: 4.3,
      reviews: 142,
    },
    {
      id: "m5",
      name: "Smart LED Light Bulb",
      price: 15.99,
      image: "https://via.placeholder.com/300x300?text=Smart+Bulb",
      rating: 4.4,
      reviews: 87,
    },
    {
      id: "m6",
      name: "Yoga Mat",
      price: 29.99,
      image: "https://via.placeholder.com/300x300?text=Yoga+Mat",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: "m7",
      name: "Bluetooth Speaker",
      price: 39.99,
      image: "https://via.placeholder.com/300x300?text=Bluetooth+Speaker",
      rating: 4.6,
      reviews: 189,
    },
    {
      id: "m8",
      name: "Scented Candle Set",
      price: 22.99,
      image: "https://via.placeholder.com/300x300?text=Candles",
      rating: 4.7,
      reviews: 124,
    },
    {
      id: "m9",
      name: "Leather Wallet",
      price: 32.99,
      image: "https://via.placeholder.com/300x300?text=Wallet",
      rating: 4.5,
      reviews: 112,
    },
    {
      id: "m10",
      name: "Portable Power Bank",
      price: 27.99,
      image: "https://via.placeholder.com/300x300?text=Power+Bank",
      rating: 4.4,
      reviews: 167,
    },
  ],
}

console.log("Data.js loaded, products:", products)


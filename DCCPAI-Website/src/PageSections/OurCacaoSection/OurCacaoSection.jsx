// import styles from './OurCacaoSection.module.css';
// import React, { useEffect, useState, useRef } from 'react';
// import ProductCard2 from '../../ProductCard2/ProductCard2.jsx';
// import { getProducts } from '../../api/getProduct.js';

// function OurCacaoSection() {
//   const [products, setProducts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);  // Track the current index of the carousel

//   // Load Products
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const productData = await getProducts();
//         setProducts(productData.filter(product => !Boolean(Number(product.product_deleted))));  // Filter out deleted products
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     loadProducts();
//   }, []);

//   //STACKOVERFLOW ReactJS Couresel Horizontal Guide & ChatGPT

//   // Automatic carousel transition every 3.2 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         (prevIndex + 1) % Math.ceil(products.length / 3)  // Move to the next set of products (3 per set)
//       );
//     }, 3600000); //Make it one hour so that it wont turn anymore

//     return () => clearInterval(interval);  // Cleanup interval on component unmount
//   }, [products.length]);

//   // Calculate the transform value for horizontal sliding
//   const translateXValue = -(currentIndex * 100);  // Shift the container left for each set of 3 products

//   return (
//     <div className={styles.ourCacaoSection}>
//       <div className={styles.ourCacaoSectionTitle}>
//         <div className={styles.ourCacaoMainText}>
//           Our Cacao
//         </div>
//         <div className={styles.ourCacaoSubText}>
//           Distinctly Davao.
//         </div>
//       </div>

//       <div className={styles.swiperContainer}>
//         <div
//           className={styles.carouselInner}
//           style={{ transform: `translateX(${translateXValue}%)` }}  // Horizontal sliding effect
//         >
//           {products.map((product, index) => (
//             <div className={styles.swiperSlide} key={product.product_id}>
//               <ProductCard2
//                 id={Number(product.product_id)}
//                 name={product.product_name}
//                 description={product.product_description}
//                 price={Number(product.product_price)}
//                 category_id={Number(product.category_id)}
//                 display={Boolean(Number(product.display))}
//                 available={Boolean(Number(product.available))}
//                 product_deleted={Boolean(Number(product.product_deleted))}
//                 buttonLink="ProductDetails"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OurCacaoSection;

// OLD CSS FOR THE WORKIGN COURESEL
// /* beginning of ourCacaoSection section */
// .ourCacaoSection {
//     padding: 5rem var(--leftrightpadding) 5rem var(--leftrightpadding);
//     background-color: var(--lighter-yellow-color);
// }

// .ourCacaoSectionTitle {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     row-gap: 0;
// }

// .ourCacaoMainText {
//     font-family: var(--LilitaOne);
//     font-size: 8rem;
// }

// .ourCacaoSubText {
//     font-size: 3rem;
//     font-style: italic;
//     font-weight: bold;
//     color: var(--dark-green-color);
// }

// .ourCacaoProducts {
//     margin-top: 5rem;
//     padding-right: 0;
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start; /* Prevents cards from stretching */
//     height: 34rem;
//     width: 42rem;
//     overflow: hidden;
//     border-radius: 3rem;
//     border: solid 2px;
// }

// /* Carousel container styling */
// .swiperContainer {
//   margin-top: 6rem;
//   overflow: hidden;
//   width: 100%;
//   position: relative;
// }

// .carouselInner {
//   display: flex;
//   transition: transform 1.6s ease-in-out;  /* Smooth sliding transition */
// }

// .swiperSlide {
//   min-width: 33.33%; /* Each slide takes up one-third of the container */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-shrink: 0; /* Ensure slides don't shrink when fewer than 3 products */
// }


// import styles from './OurCacaoSection.module.css';
// import React, { useEffect, useState } from 'react';
// import ProductCard2 from '../../ProductCard2/ProductCard2.jsx';
// import { getProducts } from '../../api/getProduct.js';

// function OurCacaoSection() {
//   const [products, setProducts] = useState([]);

//   // Load Products
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const productData = await getProducts();
//         setProducts(productData.filter(product => !Boolean(Number(product.product_deleted))));  // Filter out deleted products
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     loadProducts();
//   }, []);

//   return (
//     <div className={styles.ourCacaoSection}>
//       <div className={styles.ourCacaoSectionTitle}>
//         <div className={styles.ourCacaoMainText}>
//           Our Cacao
//         </div>
//         <div className={styles.ourCacaoSubText}>
//           Distinctly Davao.
//         </div>
//       </div>

//       <div className={styles.swiperContainer}>
//         <div className={styles.carouselInner}>
//           {products.slice(0, 3).map((product) => (  // Only display the first 3 products
//             <div className={styles.swiperSlide} key={product.product_id}>
//               <ProductCard2
//                 id={Number(product.product_id)}
//                 name={product.product_name}
//                 description={product.product_description}
//                 price={Number(product.product_price)}
//                 category_id={Number(product.category_id)}
//                 display={Boolean(Number(product.display))}
//                 available={Boolean(Number(product.available))}
//                 product_deleted={Boolean(Number(product.product_deleted))}
//                 buttonLink="ProductDetails"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OurCacaoSection;


import styles from './OurCacaoSection.module.css';
import React, { useEffect, useState } from 'react';
import ProductCard2 from '../../ProductCard2/ProductCard2.jsx';
import { getProducts } from '../../api/getProduct.js';

function OurCacaoSection() {
  const [products, setProducts] = useState([]);

  // Helper function to shuffle an array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Load Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await getProducts();
        const filteredProducts = productData.filter(product => !Boolean(Number(product.product_deleted)));  // Filter out deleted products
        const shuffledProducts = shuffleArray(filteredProducts);  // Shuffle the filtered products
        setProducts(shuffledProducts.slice(0, 3));  // Set only 3 random products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className={styles.ourCacaoSection}>
      <div className={styles.ourCacaoSectionTitle}>
        <div className={styles.ourCacaoMainText}>
          Our Best
        </div>
        <div className={styles.ourCacaoSubText}>
          Distinctly Davao.
        </div>
      </div>

      <div className={styles.swiperContainer}>
        <div className={styles.carouselInner}>
          {products.map((product) => (  // Display 3 random products
            <div className={styles.swiperSlide} key={product.product_id}>
              <ProductCard2
                id={Number(product.product_id)}
                name={product.product_name}
                description={product.product_description}
                price={Number(product.product_price)}
                category_id={Number(product.category_id)}
                display={Boolean(Number(product.display))}
                available={Boolean(Number(product.available))}
                product_deleted={Boolean(Number(product.product_deleted))}
                buttonLink="ProductDetails"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurCacaoSection;
import React, { useEffect, useState } from 'react';
import styles from './StoreBodySection.module.css';
import ProductCard2Small from '../../ProductCard2Small/ProductCard2Small.jsx'

// API's
import { getProducts } from '../../api/getProduct.js';
import fetchCategories from '../../api/fetchCategories.js';
import fetchBrands from '../../api/fetchBrands.js';
import fetchProductBrands from '../../api/fetchProductBrands.js'; 


function ShopBodySection() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // State to store categories
    const [brands, setBrands] = useState([]); // State to store brands
    const [productBrands, setProductBrands] = useState([]); // State to store the product-brand relationship
    const [selectedBrand, setSelectedBrand] = useState(null); // Track the selected brand
    const [currentPage, setCurrentPage] = useState(1);  // Track current page
    const [selectedPriceRange, setSelectedPriceRange] = useState('all'); // State to track price range
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);  // Track selected category_id
    const [isCacaoCategory, setIsCacaoCategory] = useState(null); // Track Cacao or Non-Cacao category
    const [error, setError] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);  // Track page transition
    const productsPerPage = 9;  // Define how many products per page

    // Load product data
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);  // Set products fetched from the API
                // console.log(productData + "");
            } catch (error) {
                setError(error.message);  // Handle errors
            }
        };
        // Load Categories data
        const loadCategories = async () => {
            try {
                const categoryData = await fetchCategories();
                const processedCategories = categoryData.map(category => ({
                    ...category,
                    product_isCacao: category.product_isCacao === '1' || category.product_isCacao === 1
                }));
                setCategories(processedCategories);  // Set categories fetched from the API
            } catch (error) {
                setError(error.message);  // Handle errors
            }
        };
        // Load Product Owner 
        const loadBrands = async () => {
            try {
                const brandData = await fetchBrands();
                setBrands(brandData);  // Set brands fetched from the API
            } catch (error) {
                setError(error.message);  // Handle errors
            }
        };
        // Load ProductOwners relationship
        const loadProductBrands = async () => {
            try {
                const productBrandData = await fetchProductBrands();  // Fetch the product-brand relationship
                setProductBrands(productBrandData);  // Set the product-brand relationship data
            } catch (error) {
                setError(error.message);  // Handle errors
            }
        };

        //Load to the Page
        loadProducts();
        loadCategories();
        loadBrands();
        loadProductBrands(); 
    }, []
    );

    // Price range filtering logic
    const filterByPriceRange = (product) => {
        const price = product.product_price;
        if (selectedPriceRange === '0-200') {
            return price <= 200;
        } else if (selectedPriceRange === '201-500') {
            return price > 200 && price <= 500;
        } else if (selectedPriceRange === '501-above') {
            return price > 500;
        }
        return true;  // 'all' price range shows all products
    };

    // Category filtering logic
    const filterByCategory = (product) => {
        if (selectedCategoryId === null) {
            return true;  // If no category is selected, show all products
        }
        return product.category_id === selectedCategoryId;  // Filter by selected category_id
    };

    // Filter products by Cacao or Non-Cacao categories
    const filterByCacao = (product) => {
        if (isCacaoCategory === null) {
            return true;  // Show all products if no distinction
        }
        const category = categories.find(cat => cat.category_id === product.category_id);
        return category ? category.product_isCacao === isCacaoCategory : false;
    };

    // Filter by selected brand (based on the product-brand relationship)
    const filterByBrand = (product) => {
        if (selectedBrand === null) return true;
        const productBrand = productBrands.find(pb => pb.product_id === product.product_id);
        return productBrand ? productBrand.product_owner_name === selectedBrand : false;
    };

    // Fetch authToken from the local variable
     const authToken = JSON.parse(localStorage.getItem('authToken')); // Convert to boolean

    // Apply the price range, Cacao/Non-Cacao, category, and brand filters to products
    const filteredProducts = products
        .filter((product) => {
            // Logic: If product.display is false, only show if authToken is true
            // Otherwise, display the product as usual
            if (!Boolean(Number(product.display))) {
                return authToken; //Bypass the  filtration
            }
            return true;  // Show product if display is true
        })
        .filter((product) => !Boolean(Number(product.product_deleted)))  // Filter out products where display is false
        .filter(filterByPriceRange)
        .filter(filterByCacao)
        .filter(filterByCategory)
        .filter(filterByBrand);
    
    // Pagination calculation
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Error handling
    if (error) {
        return <div>Error: {error}</div>;
    }

    //STACKOVERFLOW AND ZUES PROJECT
    // Handle page change with transition effect, followed by smooth scroll to top
    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setIsTransitioning(true);  // Start transition
            setTimeout(() => {
                setCurrentPage(pageNumber);  // Update the page after the transition
                setIsTransitioning(false);  // End transition
                
                // Scroll to top after a slight delay to ensure content has updated
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }, 100);  // Delay to allow the page change to complete first
            }, 300);  // Match this to the transition duration
        }
    };

    // Categoires Button Functionality
    // Handle price range filter change
    const handlePriceRangeChange = (event) => {
        setSelectedPriceRange(event.target.value);
        setCurrentPage(1); // Reset to page 1 when filter changes
    };

    // Handle category selection change
    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId(categoryId);  // Set selected category_id
        
        setCurrentPage(1);  // Reset to page 1 when filter changes
    };

    // Handle Cacao/Non-Cacao selection change
    const handleCacaoCategoryChange = (isCacao) => {
        setIsCacaoCategory(isCacao);
        setSelectedCategoryId(null);  // Reset selected category when switching between Cacao/Non-Cacao
        setCurrentPage(1);  // Reset to page 1 when filter changes
    };

    // Handle brand selection
    const handleBrandChange = (brandName) => {
        setSelectedBrand(brandName);
        setCurrentPage(1);  // Reset to page 1 when brand filter changes
    };

    return(
    <>
           <div className={styles.storeBodyContainer}>
            <div className={styles.storeBodyLeft}>
                <h1>Categories</h1>
                <h2>All Products</h2>
                <div>
                    <a onClick={() => handleCacaoCategoryChange(true)}>
                        <h2>Cacao</h2>
                    </a>
                    {categories.filter(category => category.product_isCacao).length > 0 ? (
                        <ul>
                            {categories.filter(category => category.product_isCacao).map(category => (
                                <a 
                                    key={category.category_id} 
                                    onClick={() => handleCategoryChange(category.category_id)}
                                    className={selectedCategoryId === category.category_id ? styles.activeCategory : ''}
                                >
                                    <li>{category.product_category}</li>
                                </a>
                            ))}
                        </ul>
                    ) : (
                        <p>No Cacao categories found.</p>
                    )}
                </div>
                <div>
                    <a onClick={() => handleCacaoCategoryChange(false)}>
                        <h2>Non-Cacao</h2>
                    </a>
                    {categories.filter(category => !category.product_isCacao).length > 0 ? (
                        <ul>
                            {categories.filter(category => !category.product_isCacao).map(category => (
                                <a 
                                    key={category.category_id} 
                                    onClick={() => handleCategoryChange(category.category_id)}
                                    className={selectedCategoryId === category.category_id ? styles.activeCategory : ''}
                                >
                                    <li>{category.product_category}</li>
                                </a>
                            ))}
                        </ul>
                    ) : (
                        <p>No Non-Cacao categories found.</p>
                    )}
                {/* <button className={styles.filterButton} onClick={() => handleCacaoCategoryChange(false)}>Show All Non-Cacao</button> */}
            </div>
            
            <div>
                <a onClick={() => setSelectedBrand(null)}>
                    <h2>Brand</h2>
                </a>
                    {brands.length > 0 ? (
                        <ul>
                            {brands.map(brand => (
                                <a 
                                    key={brand.product_owner_id} 
                                    onClick={() => handleBrandChange(brand.product_owner_name)}
                                    className={selectedBrand === brand.product_owner_name ? styles.activeBrand : ''}
                                >
                                    <li>{brand.product_owner_name}</li>
                                </a>
                            ))}
                        </ul>
                    ) : (
                    <p>No brands found.</p>
                    )}

                    {/* Price Range Filter */}
                        <div className={styles.filterContainer}>
                            <h2>
                        <label htmlFor="priceRange">Filter by Price Range: </label><br></br>

                            </h2>
                        <select id="priceRange" className={styles.priceRange} value={selectedPriceRange} onChange={handlePriceRangeChange}>
                            <option value="all">All</option>
                            <option value="0-200">$0 - $200</option>
                            <option value="201-500">$201 - $500</option>
                            <option value="501-above">$501 and above</option>
                        </select>
                    </div>

                    <button className={styles.filterButton} onClick={() => {
                        setSelectedPriceRange('all');
                        setSelectedCategoryId(null);
                        setIsCacaoCategory(null);  // Clear Cacao/Non-Cacao selection
                        setSelectedBrand(null);  // Clear selected brand
                        setCurrentPage(1);
                    }}>
                        Clear Filters
                    </button>
            </div>         
        </div>

        <div className={styles.storeBodyRight}>
                {currentProducts.length > 0 ? (
                    <div className={`${styles.storeBodyGrid} ${isTransitioning ? styles.transitioning : ''}`}>
                        {currentProducts.map((product) => (
                            <ProductCard2Small
                                key={product.product_id}
                                id={Number(product.product_id)}                    // Convert to number
                                name={product.product_name}
                                description={product.product_description}
                                price={Number(product.product_price)}
                                category_id={Number(product.category_id)}          // Convert to number
                                display={Boolean(Number(product.display))}         // Convert to boolean
                                available={Boolean(Number(product.available))}     // Convert to boolean
                                product_deleted={Boolean(Number(product.product_deleted))}  // Convert to boolean
                                buttonLink="ProductDetails"
                            />
                        ))}
                        {/* Fill the grid with empty divs if less than 9 products */}
                        {currentProducts.length < productsPerPage && Array(productsPerPage - currentProducts.length).fill(<div className={styles.emptyGridSlot}></div>)}
                    </div>
                ) : (
                    <div className={styles.noProductsFound}>No products found.</div>
                )}
            <div className={styles.pageList}>
                {/* Create page number buttons dynamically */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <div
                        key={index + 1}
                        className={currentPage === index + 1 ? styles.activePage : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
    );
}

export default ShopBodySection
package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.model.Category;
import com.shruti.ecommerce.wallet.repository.CategoryRepository;
import com.shruti.ecommerce.wallet.exception.ProductNotFoundException;
import com.shruti.ecommerce.wallet.model.Product;
import com.shruti.ecommerce.wallet.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.shruti.ecommerce.wallet.dto.ProductRequestDTO;
import com.shruti.ecommerce.wallet.dto.ProductResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class ProductService {

    private static final Logger logger =
            LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }


    // Save Product
    public ProductResponseDTO saveProduct(ProductRequestDTO requestDTO) {

        logger.info("Saving new product: {}", requestDTO.getName());

        Category category = categoryRepository.findById(requestDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();

        product.setName(requestDTO.getName());
        product.setPrice(requestDTO.getPrice());
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);

        logger.info("Product saved successfully with ID: {}", savedProduct.getId());

        return ProductResponseDTO.builder()
                .id(savedProduct.getId())
                .name(savedProduct.getName())
                .price(savedProduct.getPrice())
                .categoryId(savedProduct.getCategory().getId())
                .categoryName(savedProduct.getCategory().getName())
                .build();
    }

    // Get All Products
    public List<ProductResponseDTO> getAllProducts() {

        logger.info("Fetching all products");

        return productRepository.findAll()
                .stream()
                .map(product -> ProductResponseDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .build())
                .toList();
    }

    public ProductResponseDTO getProductById(Long id) {

        logger.info("Fetching product with ID: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product Not Found"));

        logger.info("Product found with ID: {}", id);

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .build();
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {

        logger.info("Updating product with ID: {}", id);

        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct != null) {

            existingProduct.setName(requestDTO.getName());
            existingProduct.setPrice(requestDTO.getPrice());

            Category category = categoryRepository.findById(requestDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            existingProduct.setCategory(category);

            Product savedProduct = productRepository.save(existingProduct);

            logger.info("Product updated successfully with ID: {}", id);

            return ProductResponseDTO.builder()
                    .id(savedProduct.getId())
                    .name(savedProduct.getName())
                    .price(savedProduct.getPrice())
                    .categoryId(savedProduct.getCategory().getId())
                    .categoryName(savedProduct.getCategory().getName())
                    .build();
        }

        return null;
    }

    public String deleteProduct(Long id) {

        logger.info("Deleting product with ID: {}", id);

        if (productRepository.existsById(id)) {

            productRepository.deleteById(id);

            logger.info("Product deleted successfully with ID: {}", id);

            return "Product Deleted Successfully";
        }

        logger.warn("Product with ID {} not found", id);

        throw new ProductNotFoundException("Product Not Found");
    }

    public Page<ProductResponseDTO> getProducts(
            int page,
            int size,
            String field,
            String direction) {

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(field).descending();
        } else {
            sort = Sort.by(field).ascending();
        }

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage = productRepository.findAll(pageable);

        return productPage.map(product ->
                ProductResponseDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .build());
    }


    public List<ProductResponseDTO> getProductsSorted(String field, String direction) {

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(field).descending();
        } else {
            sort = Sort.by(field).ascending();
        }

        List<Product> products = productRepository.findAll(sort);

        return products.stream()
                .map(product -> ProductResponseDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .build())
                .toList();
    }

    public List<ProductResponseDTO> searchProducts(String keyword) {

        logger.info("Searching products with keyword: {}", keyword);

        List<Product> products = productRepository
                .findByNameContainingIgnoreCase(keyword);

        return products.stream()
                .map(product -> ProductResponseDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .build())
                .toList();
    }

    public List<ProductResponseDTO> filterProductsByCategory(Long categoryId) {

        logger.info("Filtering products by category ID: {}", categoryId);

        List<Product> products = productRepository.findByCategoryId(categoryId);

        return products.stream()
                .map(product -> ProductResponseDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .build())
                .toList();
    }

    public List<ProductResponseDTO> filterProductsByPrice(
            Double minPrice,
            Double maxPrice) {

        logger.info("Filtering products between {} and {}", minPrice, maxPrice);

        List<Product> products =
                productRepository.findByPriceBetween(minPrice, maxPrice);

        return products.stream()
                .map(product -> ProductResponseDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .build())
                .toList();
    }

    public List<ProductResponseDTO> filterProducts(
            Long categoryId,
            Double minPrice,
            Double maxPrice) {

        logger.info("Filtering products by category {} and price between {} and {}",
                categoryId, minPrice, maxPrice);

        List<Product> products =
                productRepository.findByCategoryIdAndPriceBetween(
                        categoryId,
                        minPrice,
                        maxPrice);

        return products.stream()
                .map(product -> ProductResponseDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .build())
                .toList();
    }
}
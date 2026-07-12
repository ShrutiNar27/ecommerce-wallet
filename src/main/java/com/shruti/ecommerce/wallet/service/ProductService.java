package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.exception.ProductNotFoundException;
import com.shruti.ecommerce.wallet.model.Product;
import com.shruti.ecommerce.wallet.repository.ProductRepository;
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

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Save Product
    public ProductResponseDTO saveProduct(ProductRequestDTO requestDTO) {

        logger.info("Saving new product: {}", requestDTO.getName());

        Product product = new Product();

        product.setName(requestDTO.getName());
        product.setPrice(requestDTO.getPrice());

        Product savedProduct = productRepository.save(product);

        logger.info("Product saved successfully with ID: {}", savedProduct.getId());

        return ProductResponseDTO.builder()
                .id(savedProduct.getId())
                .name(savedProduct.getName())
                .price(savedProduct.getPrice())
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
                        .build())
                .toList();
    }

    public ProductResponseDTO getProductById(Long id){

        logger.info("Fetching product with ID: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product Not Found"));

        logger.info("Product found with ID: {}", id);

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .build();
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {

        logger.info("Updating product with ID: {}", id);

        Product existingProduct = productRepository.findById(id).orElse(null);

        if(existingProduct != null){

            existingProduct.setName(requestDTO.getName());
            existingProduct.setPrice(requestDTO.getPrice());

            Product savedProduct = productRepository.save(existingProduct);

            logger.info("Product updated successfully with ID: {}", id);

            return ProductResponseDTO.builder()
                    .id(savedProduct.getId())
                    .name(savedProduct.getName())
                    .price(savedProduct.getPrice())
                    .build();
        }

        return null;
    }

    public String deleteProduct(Long id){

        logger.info("Deleting product with ID: {}", id);

        if(productRepository.existsById(id)){

            productRepository.deleteById(id);

            logger.info("Product deleted successfully with ID: {}", id);

            return "Product Deleted Successfully";
        }

        logger.warn("Product with ID {} not found", id);

        throw new ProductNotFoundException("Product Not Found");
    }
}
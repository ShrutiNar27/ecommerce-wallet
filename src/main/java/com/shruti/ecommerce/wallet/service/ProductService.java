package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.exception.ProductNotFoundException;
import com.shruti.ecommerce.wallet.model.Product;
import com.shruti.ecommerce.wallet.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.shruti.ecommerce.wallet.dto.ProductRequestDTO;
import com.shruti.ecommerce.wallet.dto.ProductResponseDTO;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Save Product
    public ProductResponseDTO saveProduct(ProductRequestDTO requestDTO) {

        Product product = new Product();

        product.setName(requestDTO.getName());
        product.setPrice(requestDTO.getPrice());

        Product savedProduct = productRepository.save(product);

        return new ProductResponseDTO(
                savedProduct.getId(),
                savedProduct.getName(),
                savedProduct.getPrice()
        );
    }

    // Get All Products
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductResponseDTO(
                        product.getId(),
                        product.getName(),
                        product.getPrice()
                ))
                .toList();
    }

    public ProductResponseDTO getProductById(Long id){

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product Not Found"));

        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getPrice()
        );
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {

        Product existingProduct = productRepository.findById(id).orElse(null);

        if(existingProduct != null){

            existingProduct.setName(requestDTO.getName());
            existingProduct.setPrice(requestDTO.getPrice());

            Product savedProduct = productRepository.save(existingProduct);

            return new ProductResponseDTO(
                    savedProduct.getId(),
                    savedProduct.getName(),
                    savedProduct.getPrice()
            );
        }

        return null;
    }

    public String deleteProduct(Long id){

        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
            return "Product Deleted Successfully";
        }

        return "Product Not Found";
    }
}
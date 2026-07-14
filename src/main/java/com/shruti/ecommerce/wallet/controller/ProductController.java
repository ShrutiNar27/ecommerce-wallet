package com.shruti.ecommerce.wallet.controller;

import com.shruti.ecommerce.wallet.dto.ProductRequestDTO;
import com.shruti.ecommerce.wallet.dto.ProductResponseDTO;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.shruti.ecommerce.wallet.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // POST API
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(
            @Valid @RequestBody ProductRequestDTO requestDTO) {

        ProductResponseDTO savedProduct = productService.saveProduct(requestDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProduct);
    }
    // GET API
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getProducts() {

        List<ProductResponseDTO> products = productService.getAllProducts();

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {

        ProductResponseDTO product = productService.getProductById(id);

        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDTO requestDTO) {

        ProductResponseDTO updatedProduct = productService.updateProduct(id, requestDTO);;

        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){

        String message = productService.deleteProduct(id);

        return ResponseEntity.ok(message);
    }

    @GetMapping("/page")
    public Page<ProductResponseDTO> getProducts(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String field,
            @RequestParam String direction) {

        return productService.getProducts(
                page,
                size,
                field,
                direction);
    }

    @GetMapping("/sort")
    public List<ProductResponseDTO> getProductsSorted(
            @RequestParam String field,
            @RequestParam String direction) {

        return productService.getProductsSorted(field, direction);
    }
}
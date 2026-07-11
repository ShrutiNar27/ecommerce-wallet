package com.shruti.ecommerce.wallet.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductRequestDTO {

    @NotBlank(message = "Product name cannot be empty")
    private String name;

    @NotNull(message = "Price cannot be null")
    @Min(value = 1, message = "Price must be greater than 0")
    private Double price;

    public ProductRequestDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
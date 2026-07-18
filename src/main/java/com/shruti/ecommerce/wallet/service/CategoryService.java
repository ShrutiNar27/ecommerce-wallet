package com.shruti.ecommerce.wallet.service;

import com.shruti.ecommerce.wallet.dto.CategoryRequestDTO;
import com.shruti.ecommerce.wallet.dto.CategoryResponseDTO;
import com.shruti.ecommerce.wallet.model.Category;
import com.shruti.ecommerce.wallet.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponseDTO createCategory(CategoryRequestDTO requestDTO) {

        if(categoryRepository.existsByName(requestDTO.getName())){
            throw new RuntimeException("Category already exists");
        }

        Category category = Category.builder()
                .name(requestDTO.getName())
                .description(requestDTO.getDescription())
                .build();

        Category savedCategory = categoryRepository.save(category);

        return CategoryResponseDTO.builder()
                .id(savedCategory.getId())
                .name(savedCategory.getName())
                .description(savedCategory.getDescription())
                .build();
    }

    public List<CategoryResponseDTO> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(category -> CategoryResponseDTO.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .description(category.getDescription())
                        .build())
                .toList();
    }

    public CategoryResponseDTO getCategoryById(Long id){

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return CategoryResponseDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    public void deleteCategory(Long id){

        if(!categoryRepository.existsById(id)){
            throw new RuntimeException("Category not found");
        }

        categoryRepository.deleteById(id);
    }

}

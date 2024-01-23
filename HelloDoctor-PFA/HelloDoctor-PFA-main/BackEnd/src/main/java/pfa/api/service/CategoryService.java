package pfa.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfa.api.model.Category;
import pfa.api.repository.CategoryRepository;

import jakarta.transaction.Transactional;
import lombok.Data;

@Data
@Service
@Transactional
public class CategoryService implements CategoryServiceInterface{

	@Autowired
    private CategoryRepository categoryRepository;
	
	@Override
	public List<Category> getAllCategories() {
		return (List<Category>) categoryRepository.findAll();
	}

	@Override
	public Category getCategoryById(Long id) {
		return categoryRepository.findById(id).get();
	}

	@Override
	public void saveOrUpdateCategory(Category category) {
		categoryRepository.save(category);
	}

	@Override
	public void deleteCategoryById(Long id) {
		categoryRepository.deleteById(id);	
	}

}

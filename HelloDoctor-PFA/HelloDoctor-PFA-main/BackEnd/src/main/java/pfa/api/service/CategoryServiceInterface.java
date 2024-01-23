package pfa.api.service;

import java.util.List;

import pfa.api.model.Category;

public interface CategoryServiceInterface {
	public List<Category> getAllCategories();
	public Category getCategoryById(Long id);
	public void saveOrUpdateCategory(Category employee);
	public void deleteCategoryById(Long id);
}

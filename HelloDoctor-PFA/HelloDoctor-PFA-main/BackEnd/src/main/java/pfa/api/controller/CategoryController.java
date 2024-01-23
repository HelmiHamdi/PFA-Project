package pfa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pfa.api.model.Category;
import pfa.api.service.CategoryService;

@RestController
@EnableAutoConfiguration
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired 
	CategoryService categoryService;
	
	@PostMapping("/save")
	public Category save(@RequestBody Category category) {
		categoryService.saveOrUpdateCategory(category);
		return category;
	}
	
	@GetMapping("/list")
	public List<Category> list() {
		return categoryService.getAllCategories();
	}
	
	@GetMapping("/list/{id}")
	public Category listById(@PathVariable Long id) {
		return categoryService.getCategoryById(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable (value = "id") Long id) {
		categoryService.deleteCategoryById(id);
		return "Deleted successfully id = " + id;
	}
}

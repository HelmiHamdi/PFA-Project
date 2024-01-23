package pfa.api.repository;

import org.springframework.data.repository.CrudRepository;
import pfa.api.model.Category;


public interface CategoryRepository extends CrudRepository<Category, Long> {

}

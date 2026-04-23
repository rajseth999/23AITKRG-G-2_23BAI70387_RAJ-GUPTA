package com.experiment9.repository;

import com.experiment9.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Pagination support for scalability
    Page<Product> findAll(Pageable pageable);

    Page<Product> findByCategory(String category, Pageable pageable);

    // Projection query — only fetch needed columns
    @Query("SELECT p.id, p.name, p.price FROM Product p WHERE p.price BETWEEN :min AND :max")
    List<Object[]> findNameAndPriceInRange(@Param("min") double min, @Param("max") double max);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
}

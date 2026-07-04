package com.javastudy.jjj.repository;

import com.javastudy.jjj.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByAuthor(String author);
    
    List<Item> findByAuthorAndDate(String author, LocalDate date);
    
    List<Item> findByCategory(String category);
    
    @Query("SELECT DISTINCT i.category FROM Item i WHERE i.category IS NOT NULL")
    List<String> findAllCategories();
    
    @Query("SELECT i FROM Item i WHERE LOWER(i.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(i.note) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(i.author) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Item> searchItems(@Param("searchTerm") String searchTerm);
}

package com.javastudy.jjj.controller;

import com.javastudy.jjj.entity.Item;
import com.javastudy.jjj.service.ItemService;
import com.javastudy.jjj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemService itemService;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody Map<String, String> request) {
        try {
            String title = request.get("title");
            String note = request.get("note");
            String author = request.get("author");
            String photos = request.get("photos");
            String category = request.get("category");
            Item item = itemService.createItem(title, note, author, photos, category);
            
            // Check if this is the 2nd item today, if yes update streak
            List<Item> todayItems = itemService.getItemsByAuthorAndDate(author, LocalDate.now());
            if (todayItems.size() == 2) {
                userService.updateStreak(author);
            }
            
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<Item>> getItemsByAuthor(@PathVariable String author) {
        return ResponseEntity.ok(itemService.getItemsByAuthor(author));
    }

    @GetMapping("/author/{author}/grouped")
    public ResponseEntity<Map<LocalDate, List<Item>>> getItemsByAuthorGroupedByDate(@PathVariable String author) {
        return ResponseEntity.ok(itemService.getItemsByAuthorGroupedByDate(author));
    }

    @GetMapping("/author/{author}/today")
    public ResponseEntity<List<Item>> getItemsByAuthorToday(@PathVariable String author) {
        return ResponseEntity.ok(itemService.getItemsByAuthorAndDate(author, LocalDate.now()));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(itemService.getAllCategories());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Item>> getItemsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(itemService.getItemsByCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> itemOpt = itemService.getItemById(id);
        return itemOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Item>> searchItems(@RequestParam String q) {
        return ResponseEntity.ok(itemService.searchItems(q));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id, @RequestParam String author) {
        try {
            itemService.deleteItem(id, author);
            return ResponseEntity.ok(Map.of("message", "Item deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

package com.javastudy.jjj.controller;

import com.javastudy.jjj.entity.Item;
import com.javastudy.jjj.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        String note = request.get("note");
        String author = request.get("author");
        String photos = request.get("photos");
        Item item = itemService.createItem(title, note, author, photos);
        return ResponseEntity.ok(item);
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<Item>> getItemsByAuthor(@PathVariable String author) {
        return ResponseEntity.ok(itemService.getItemsByAuthor(author));
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
}

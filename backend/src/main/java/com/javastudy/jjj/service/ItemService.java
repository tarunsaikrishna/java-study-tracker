package com.javastudy.jjj.service;

import com.javastudy.jjj.entity.Item;
import com.javastudy.jjj.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public Item createItem(String title, String note, String author, String photos, String category) {
        Item item = new Item(title, note, author, LocalDate.now(), photos, category);
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getItemsByAuthor(String author) {
        return itemRepository.findByAuthor(author);
    }

    public Map<LocalDate, List<Item>> getItemsByAuthorGroupedByDate(String author) {
        return itemRepository.findByAuthor(author).stream()
                .collect(Collectors.groupingBy(Item::getDate));
    }

    public List<Item> getItemsByAuthorAndDate(String author, LocalDate date) {
        return itemRepository.findByAuthorAndDate(author, date);
    }

    public List<Item> getItemsByCategory(String category) {
        return itemRepository.findByCategory(category);
    }

    public List<String> getAllCategories() {
        return itemRepository.findAllCategories();
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public List<Item> searchItems(String searchTerm) {
        return itemRepository.searchItems(searchTerm);
    }

    public void deleteItem(Long id, String author) {
        Optional<Item> itemOpt = itemRepository.findById(id);
        if (itemOpt.isPresent() && itemOpt.get().getAuthor().equals(author)) {
            itemRepository.deleteById(id);
        } else {
            throw new RuntimeException("Unauthorized to delete this item");
        }
    }
}

package com.javastudy.jjj.service;

import com.javastudy.jjj.entity.Item;
import com.javastudy.jjj.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public Item createItem(String title, String note, String author, String photos) {
        Item item = new Item(title, note, author, LocalDate.now(), photos);
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getItemsByAuthor(String author) {
        return itemRepository.findByAuthor(author);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public List<Item> searchItems(String searchTerm) {
        return itemRepository.searchItems(searchTerm);
    }
}

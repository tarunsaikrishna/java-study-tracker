package com.javastudy.jjj.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String note;
    
    @Column(nullable = false)
    private String author;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(columnDefinition = "TEXT")
    private String photos;
    
    private String category;

    public Item() {}

    public Item(String title, String note, String author, LocalDate date, String photos, String category) {
        this.title = title;
        this.note = note;
        this.author = author;
        this.date = date;
        this.photos = photos;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPhotos() {
        return photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

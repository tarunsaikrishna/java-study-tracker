package com.javastudy.jjj.service;

import com.javastudy.jjj.entity.User;
import com.javastudy.jjj.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = new User(username, password);
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    public User resetPassword(String username, String newPassword) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        user.setPassword(newPassword);
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateStreak(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        String today = LocalDate.now().toString();
        String lastActive = user.getLastActiveDate();
        
        if (lastActive == null) {
            user.setStreak(1);
        } else {
            LocalDate lastDate = LocalDate.parse(lastActive);
            if (lastDate.equals(LocalDate.now().minusDays(1))) {
                user.setStreak(user.getStreak() + 1);
            } else if (!lastDate.equals(LocalDate.now())) {
                user.setStreak(1);
            }
        }
        user.setLastActiveDate(today);
        return userRepository.save(user);
    }
}

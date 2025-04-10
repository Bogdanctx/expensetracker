package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.model.Account;
import com.expensetracker.expensetracker.repository.AccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {
    private final AccountRepository repository;

    public AccountController(AccountRepository repository) {
        this.repository = repository;

        repository.save(new Account("economii", 2500));
        repository.save(new Account("distractie", 1000));
        repository.save(new Account("urgenta", 4000));
    }


    @GetMapping
    public List<Account> getAllAccounts() {
        return repository.findAll();
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        if(!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.model.Account;
import com.expensetracker.expensetracker.repository.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountRepository repository;

    public AccountController(AccountRepository repository) {
        this.repository = repository;

        /*repository.save(new Account("economii", 2500));
        repository.save(new Account("distractie", 1000));
        repository.save(new Account("urgenta", 4000));*/
    }


    @GetMapping
    public List<Account> getAllAccounts() {
        return repository.findAll();
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Long id, @RequestBody Account account) {
        Optional<Account> existingAccount = repository.findById(id);

        if(existingAccount.isPresent()) {
            Account acc = existingAccount.get();

            acc.setName(account.getName());
            acc.setBalance(account.getBalance());

            repository.save(acc);
            return ResponseEntity.ok(acc);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody Account account) {
        Optional<Account> existingAccount = repository.findByName(account.getName());
        
        if(existingAccount.isPresent()) {
            return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("An account with this name already exists");
        }

        System.out.println(account);

        repository.save(account);

        return ResponseEntity.ok().build();
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

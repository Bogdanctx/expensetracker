package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.model.Account;
import com.expensetracker.expensetracker.model.Transaction;
import com.expensetracker.expensetracker.repository.AccountRepository;
import com.expensetracker.expensetracker.repository.TransactionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionController(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        try {
            transactionRepository.save(transaction);

            Account account = transaction.getAccount();

            if(account != null) {
                account.setBalance(account.getBalance() - transaction.getAmount());
                accountRepository.save(account);
            }

        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        if (!transactionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Transaction transaction = transactionRepository.findById(id).get();
        Account account = transaction.getAccount();

        if(account != null) {
            account.setBalance(account.getBalance() + transaction.getAmount());
            accountRepository.save(account);
        }

        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

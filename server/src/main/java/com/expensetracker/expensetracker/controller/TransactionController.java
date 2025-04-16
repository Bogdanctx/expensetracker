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

    public TransactionController(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;

        /*Account account = accountRepository.findByName("sanatate")
                .orElseThrow(() -> new RuntimeException("Account not found"));

        transactionRepository.save(
                new Transaction(51, "KFC", "am cumparat kfc pe 13.04.2025]", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(41, "Factura curent", "am platit factura la curent pe 13.04.2025", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(41, "Factura curent", "am platit factura la curent pe 13.04.2025", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(41, "Factura curent", "am platit factura la curent pe 13.04.2025", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(41, "Factura curent", "am platit factura la curent pe 13.04.2025", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(41, "Factura curent", "am platit factura la curent pe 13.04.2025", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(41, "Factura curent", "am platit factura la curent pe 13.04.2025", LocalDate.of(2025, 4, 14), account)
        );
*/
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

        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

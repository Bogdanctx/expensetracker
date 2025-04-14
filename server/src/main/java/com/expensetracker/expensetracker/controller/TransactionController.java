package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.model.Transaction;
import com.expensetracker.expensetracker.repository.AccountRepository;
import com.expensetracker.expensetracker.repository.TransactionRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionController(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;


        /*Account account = accountRepository.findByName("sanatate")
                .orElseThrow(() -> new RuntimeException("Account not found"));

        transactionRepository.save(
                new Transaction(51, "kfc", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(41, "curent", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(170, "intretinere", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(100, "gaze", LocalDate.of(2025, 4, 14), account)
        );
        transactionRepository.save(
                new Transaction(10, "cfr", LocalDate.of(2025, 4, 14), account)
        );*/

    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}

package com.expensetracker.expensetracker.service;


import com.expensetracker.expensetracker.exception.AccountNotFoundException;
import com.expensetracker.expensetracker.model.Account;
import com.expensetracker.expensetracker.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                                .orElseThrow(() -> new AccountNotFoundException(id));
    }

    public Account getAccountByName(String name) {
        return accountRepository.findByName(name)
                                .orElseThrow(() -> new AccountNotFoundException(name));
    }

}

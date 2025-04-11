package com.expensetracker.expensetracker.exception;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(Long id) {
        super("Account with id " + id + " not found");
    }
    public AccountNotFoundException(String name) {
        super("Account with name " + name + " not found");
    }
}

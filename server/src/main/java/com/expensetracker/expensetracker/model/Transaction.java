package com.expensetracker.expensetracker.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private double amount;
    private String description;
    private LocalDate added;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    public Transaction() {}

    public Transaction(double amount, String description, LocalDate added, Account account) {
        this.amount = amount;
        this.description = description;
        this.added = added;
        this.account = account;
    }

    public Long getId() {
        return Id;
    }

    public double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getAdded() {
        return added;
    }

    public Account getAccount() {
        return account;
    }
}

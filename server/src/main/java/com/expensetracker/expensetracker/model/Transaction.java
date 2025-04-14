package com.expensetracker.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private double amount;
    private String title;
    private String description;
    private LocalDate added;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "account_id")
    private Account account;

    public Transaction() {}

    public Transaction(double amount, String title, String description, LocalDate added, Account account) {
        this.amount = amount;
        this.title = title;
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

    public String getTitle() {
        return title;
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

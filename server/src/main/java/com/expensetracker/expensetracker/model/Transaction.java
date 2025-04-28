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
    private TYPES type;

    public enum TYPES {
        Groceries,
        Dining,
        Transportation,
        Utilities,
        Entertainment,
        Healthcare,
        Shopping,
        Other
    }

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

    public TYPES getType() {
        return type;
    }

    public void setType(TYPES type) {
        this.type = type;
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

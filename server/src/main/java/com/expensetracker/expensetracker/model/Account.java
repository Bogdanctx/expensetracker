package com.expensetracker.expensetracker.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private double balance;
    private double initialBalance;
    private LocalDate created;

    public Account() {}

    public Account(String name, double balance) {
        this.name = name;
        this.balance = balance;
        this.initialBalance = balance;
        this.created = LocalDate.now();
    }

    @Override
    public String toString() {
        return "Account [id=" + id + ", name=" + name + ", amount=" + balance + ", initial_balance=" + initialBalance + ", date=" + created + "]";
    }

    public Long getId() {
        return id;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public String getName() {
        return name;
    }

    public void setBalance(double newBalance) {
        this.balance = newBalance;
    }

    public double getBalance() {
        return balance;
    }

    public double getInitialBalance() {
        return initialBalance;
    }

    public LocalDate getCreated() {
        return created;
    }
}

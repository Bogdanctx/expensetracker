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
    private double amount;
    private LocalDate created;

    public Account() {}

    public Account(String name, double amount) {
        this.name = name;
        this.amount = amount;
        this.created = LocalDate.now();
    }

    @Override
    public String toString() {
        return "Account [id=" + id + ", name=" + name + ", amount=" + amount + ", date=" + created + "]";
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

    public void setAmount(double newAmount) {
        this.amount = newAmount;
    }

    public double getAmount() {
        return amount;
    }

    public LocalDate getCreated() {
        return created;
    }
}

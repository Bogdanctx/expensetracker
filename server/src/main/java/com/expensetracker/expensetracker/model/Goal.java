package com.expensetracker.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "goals")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    private double amountTarget;
    private String title;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "account_id")
    private Account attachedAccount;

    public Goal() {}
    public Goal(double amountTarget, String title, String description, Account attachedAccount) {
        this.amountTarget = amountTarget;
        this.title = title;
        this.description = description;
        this.attachedAccount = attachedAccount;
    }

    public double getAmountTarget() {
        return amountTarget;
    }

    public void setAmountTarget(double amountTarget) {
        this.amountTarget = amountTarget;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Account getAttachedAccount() {
        return attachedAccount;
    }

    public void setAttachedAccount(Account attachedAccount) {
        this.attachedAccount = attachedAccount;
    }
}

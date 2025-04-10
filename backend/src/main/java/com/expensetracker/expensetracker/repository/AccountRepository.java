package com.expensetracker.expensetracker.repository;

import com.expensetracker.expensetracker.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByName(String name);
}

package com.expensetracker.expensetracker.repository;

import com.expensetracker.expensetracker.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}

package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.model.Goal;
import com.expensetracker.expensetracker.repository.AccountRepository;
import com.expensetracker.expensetracker.repository.GoalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {
    private GoalRepository goalRepository;
    private AccountRepository accountRepository;

    public GoalController(GoalRepository goalRepository, AccountRepository accountRepository) {
        this.goalRepository = goalRepository;
        this.accountRepository = accountRepository;
    }

    @GetMapping
    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    @PostMapping("/create")
    public Goal createGoal(@RequestBody Goal goal) {
        return goalRepository.save(goal);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id) {
        if(!goalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        goalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

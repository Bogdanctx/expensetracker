package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.model.Goal;
import com.expensetracker.expensetracker.model.Transaction;
import com.expensetracker.expensetracker.repository.AccountRepository;
import com.expensetracker.expensetracker.repository.GoalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateGoal(@PathVariable Long id, @RequestBody Goal goal) {
        Optional<Goal> existingGoal = goalRepository.findById(id);
        Goal g = existingGoal.get();

        g.setAttachedAccount(goal.getAttachedAccount());
        goalRepository.save(g);

        return ResponseEntity.ok().build();
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

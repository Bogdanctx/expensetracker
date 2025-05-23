package com.expensetracker.expensetracker;

import com.expensetracker.expensetracker.ai.NaiveBayesClassifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ExpenseTrackerApplication {

	public static void main(String[] args) {

		SpringApplication.run(ExpenseTrackerApplication.class, args);

	}

}

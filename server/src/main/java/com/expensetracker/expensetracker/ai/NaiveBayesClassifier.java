package com.expensetracker.expensetracker.ai;

import com.expensetracker.expensetracker.model.Transaction;
import com.expensetracker.expensetracker.utilities.Pair;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.util.*;

public class NaiveBayesClassifier {
    // Bag of words
    private static final List<String> vocabulary = new ArrayList<>();

    // Map<transactionType, Map<word, frequency>>
    private static final Map<Transaction.TYPES, Map<String, Integer>> wordFrequenciesByType = new HashMap<>();

    // Map<transactionType, number of transactions>
    private static final Map<Transaction.TYPES, Integer> transactionCountByType = new HashMap<>();

    // Map<transactionType, total number of words across all transactions>
    private static final Map<Transaction.TYPES, Integer> totalWordCountByType = new HashMap<>();

    private static int totalTransactionCount = 0;

    static {
        ObjectMapper mapper = new ObjectMapper();
        List<Pair<String, Transaction.TYPES>> trainingData = new ArrayList<>();

        try {
            File file = new File("./src/main/resources/dataset.json");
            JsonNode rootNode = mapper.readTree(file);

            for (JsonNode node : rootNode) {
                String document = node.get("document").asText();
                Transaction.TYPES type = Transaction.TYPES.valueOf(node.get("type").asText());
                trainingData.add(new Pair<>(document, type));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        train(trainingData);
    }

    private static void train(List<Pair<String, Transaction.TYPES>> trainingData) {
        for (Pair<String, Transaction.TYPES> sample : trainingData) {
            String text = sample.x;
            Transaction.TYPES label = sample.y;

            List<String> tokens = Tokenizer.tokenize(text);
            vocabulary.addAll(tokens);

            Map<String, Integer> wordCounts = wordFrequenciesByType.get(label);

            if(wordCounts == null) {
                wordCounts = new HashMap<>();
                wordFrequenciesByType.put(label, wordCounts);
            }

            for (String token : tokens) {
                wordCounts.put(token, wordCounts.getOrDefault(token, 0) + 1);
            }

            transactionCountByType.put(label, transactionCountByType.getOrDefault(label, 0) + 1);
            totalTransactionCount++;
        }

        for (Transaction.TYPES type : wordFrequenciesByType.keySet()) {
            int totalWords = wordFrequenciesByType.get(type).values().stream().mapToInt(Integer::intValue).sum();
            totalWordCountByType.put(type, totalWords);
        }
    }

    public static Transaction.TYPES classify(String inputText) {
        List<String> tokens = Tokenizer.tokenize(inputText);

        Transaction.TYPES bestType = null;
        double bestLogProbability = Double.NEGATIVE_INFINITY;

        for (Transaction.TYPES type : Transaction.TYPES.values()) {
            double priorProbability = calculatePrior(type);

            if (priorProbability == 0.0) {
                continue;
            }

            double logProbability = Math.log(priorProbability);

            for (String token : tokens) {
                logProbability += Math.log(calculateLikelihood(token, type));
            }

            if (logProbability > bestLogProbability) {
                bestLogProbability = logProbability;
                bestType = type;
            }
        }

        return bestType;
    }

    private static double calculateLikelihood(String word, Transaction.TYPES type) {
        Map<String, Integer> wordCounts = wordFrequenciesByType.getOrDefault(type, Collections.emptyMap());
        int wordFrequency = wordCounts.getOrDefault(word, 0);
        int totalWordsInType = totalWordCountByType.getOrDefault(type, 0);
        int vocabularySize = vocabulary.size();

        if(totalWordsInType == 0) {
            return 1.0 / vocabularySize;
        }

        return (wordFrequency + 1.0) / (totalWordsInType + vocabularySize); // Laplace smoothing
    }

    private static double calculatePrior(Transaction.TYPES type) {
        int typeTransactionCount = transactionCountByType.getOrDefault(type, 0);
        return (double) typeTransactionCount / totalTransactionCount;
    }
}

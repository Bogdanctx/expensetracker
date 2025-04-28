package com.expensetracker.expensetracker.ai;

import java.util.ArrayList;
import java.util.List;

public class Tokenizer {
    public static List<String> tokenize(String input) {
        String regex = "[,./;'\\[\\]=\\-!@#$%\\^&\\*()_+{}|\\\\\":?><]";
        List<String> tokens = new ArrayList<>();
        input = input.replaceAll(regex, "");

        String[] words = input.toLowerCase().split("\\W+");

        for(String word : words) {
            tokens.add(word);
        }

        return tokens;
    }

}

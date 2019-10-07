package com.nanwulife.experimentRank;

/**
 * @Project: ExperimentalReportSystem
 * @Description: 光电效应实验评分模块
 * @Author: Creams
 * @Date: Created in 2018/9/15
 */
public class PhotoeletricExperiment {

    private int score = 0;

    private String[] choices = {"A", "C", "A", "B", "A", "C", "B", "B", "C", "A", "C"};
    /**
     * 学生所选的选项答案  new double[50]
     */
    private String[] choice = new String[11];
    /**
     * 每个选项的得分
     */
    private int[] choiceScore = {2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3};

    private double[] blanks = {0, 0, 0, 0, 1, 1, 1, 1};
    private double[] blank = new double[8];
    private int[] blankScore = {0, 0, 0, 0, 46, 8, 8, 8};

    public PhotoeletricExperiment(String[] choice, String[] blank, String[] table1, String[] table2, String[] table3, String[] table4) {

        /**
         * 接受选择题学生所选答案
         */
        for (int i = 0; i < choice.length; i++) {
            this.choice[i] = choice[i];
        }

        for (int i = 0; i < blank.length; i++) {
            if (i != 0 && i != 1 && i != 2 && i != 3) {
                this.blank[i] = Double.parseDouble(blank[i]);
            }
        }
    }

    public int getScore() {
        for (int i = 0; i < choices.length; i++) {
            if (choice[i].equals(choices[i])) {
                score = score + choiceScore[i];
            }
        }

        for (int i = 0; i < blank.length; i++) {
            if (i == 4) {
                if (blank[i] >= 0 && blank[i] < 3) {
                    score += 46;
                } else if (blank[i] >= 3 && blank[i] < 5) {
                    score += 40;
                } else if (blank[i] >= 5 && blank[i] < 10) {
                    score += 35;
                } else if (blank[i] >= 10 && blank[i] < 15) {
                    score += 30;
                } else if (blank[i] >=15 && blank[i] < 20) {
                    score += 25;
                } else if (blank[i] >=20 && blank[i] < 50) {
                    score += 20;
                } else {
                    score += 0;
                }
            }

            else if (i == 5 || i == 6 || i == 7){
                if (blank[i] >= 0 && blank[i] < 5) {
                    score += 8;
                } else if (blank[i] >= 5 && blank[i] < 10) {
                    score += 6;
                } else if (blank[i] >= 10 && blank[i] < 15) {
                    score += 4;
                } else if (blank[i] >= 15 && blank[i] < 20) {
                    score += 2;
                } else {
                    score += 0;
                }
            }
        }
        return score;
    }
}


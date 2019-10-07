package com.nanwulife.experimentRank;

/**
 * @Project: ExperimentalReportSystem
 * @Description: 光栅衍射及光波波长的测定实验评分模块
 * @Author: Creams
 * @Date: Created in 2018/11/24
 */
public class GratingdiffractionExperiment {
    /**
     * 总分数
     */
    private int score = 0;
    /**
     * 正确答案
     */
    private String[] choices = {"B", "A", "B", "G", "E", "B", "D", "D", "A", "B", "D", "C", "A"};
    /**
     * 学生所选的选项答案  new double[50]
     */
    private String[] choice = new String[10];
    /**
     * 每个选项的得分
     */
    private int[] choiceScore = {3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3};

    private double[] blanks = {1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1};
    private double[] blank = new double[12];
    private int[] blankScore = {11, 11, 11, 11, 0, 0, 0, 7, 0, 7, 0, 7};

    public GratingdiffractionExperiment(String[] choice, String[] blank, String[] table) {

        /**
         * 接受选择题学生所选答案
         */
        for (int i = 0; i < choice.length; i++) {
            this.choice[i] = choice[i];
        }

        for (int i = 0; i < blank.length; i++) {
            if (i != 4 && i != 5 && i != 6 && i != 8 && i != 10) {
                this.blank[i] = Double.parseDouble(blank[i]);
            }
        }
    }


    /**
     * 判分
     *
     * @return
     */

    public int getScore() {

        /**
         * 计算选择题
         */
        for (int i = 0; i < choices.length; i++) {
            if (choice[i].equals(choices[i])) {
                score = score + choiceScore[i];
            }
        }

        for (int i = 0; i < blank.length; i++) {
            if (i == 0) {
                if (blank[i] >= 9.0 && blank[i] <= 10) {
                    score += 11;
                }else {
                    score += 6;
                }
            }
            else if (i == 1) {
                if (blank[i] >= 18.0 && blank[i] <= 20) {
                    score += 11;
                }else {
                    score += 6;
                }
            }
            else if (i == 2) {
                if (blank[i] >= 9.8 && blank[i] <= 10.2) {
                    score += 11;
                }else {
                    score += 6;
                }
            }
            else if (i == 3) {
                if (blank[i] >= 9.8 && blank[i] <= 10.2) {
                    score += 11;
                }else {
                    score += 6;
                }
            }

            else if (i == 7 || i == 9|| i == 11) {
                if (blank[i] > 0 && blank[i] <= 5) {
                    score += 7;
                } else if (blank[i] > 5 && blank[i] <= 10) {
                    score += 5;
                } else if (blank[i] > 10 && blank[i] <= 15) {
                    score += 3;
                } else if (blank[i] > 15 && blank[i] <= 20) {
                    score += 1;
                } else {
                    score += 0;
                }
            }
        }
        return score;
    }
}


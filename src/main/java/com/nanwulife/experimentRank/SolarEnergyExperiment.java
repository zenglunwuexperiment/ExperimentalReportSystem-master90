package com.nanwulife.experimentRank;

/**
 * @Project: ExperimentalReportSystem
 * @Description: 太阳能实验评分模块
 * @Author: Creams
 * @Date: Created in 2018/10/03
 */
public class SolarEnergyExperiment {
    /**
     * 总分数
     */
    private int score = 0;
    /**
     * 正确答案
     */
    private String[] choices = {"C", "B", "C", "D", "B", "B", "D", "C", "C", "D"};
    /**
     * 学生所选的选项答案  new double[50]
     */
    private String[] choice = new String[10];
    /**
     * 每个选项的得分
     */
    private int[] choiceScore = {4, 4, 4, 4, 4, 4, 4, 4, 4, 4};

    private double[] blanks = {0, 0, 0, 1, 0, 0, 0, 1};
    private double[] blank = new double[8];
    private int[] blankScore = {0, 0, 0, 30, 0, 0, 0, 30};
    /**
     * 接收参数
     *
     * @param choice 选择题
     * @param blank  填空题
     * @param table1 表格1数据
     * @param table2 表格2数据
     * @param table3 表格3数据
     * @param table4 表格4数据
     */
    public SolarEnergyExperiment(String[] choice, String[] blank, String[] table1,
                                 String[] table2, String[] table3, String[] table4) {

        /**
         * 接受选择题学生所选答案
         */
        for (int i = 0; i < choice.length; i++) {
            this.choice[i] = choice[i];
        }

        for (int i = 0; i < blank.length; i++) {
            if (i != 0 && i != 1 && i != 2 && i != 4 && i != 5 && i != 6) {
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
            if (i == 3 || i == 7) {
                if (blank[i] >= 0.5 && blank[i] <= 0.8) {
                    score += 30;
                } else if (blank[i] > 0.8 && blank[i] <= 0.9) {
                    score += 20;
                } else if (blank[i] >= 0.3 && blank[i] < 0.5) {
                    score += 20;
                } else if (blank[i] > 0.9 && blank[i] <= 1.0) {
                    score += 10;
                } else if (blank[i] > 0 && blank[i] < 0.3) {
                    score += 10;
                } else {
                    score += 0;
                }
            }
        }
        return score;
    }
}


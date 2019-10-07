package com.nanwulife.experimentRank;

/**
 * @author 张文军
 * @Description:导热系数判分类 * @Company:南京农业大学工学院
 * @version:1.0
 * @date 2019/7/2515:39
 */
public class ReDaoXiShuCeDing {
    /**
     * 总分数
     */
    private int score = 0;
    /**
     * 正确答案
     */
    private String[] choices = {"C", "A", "A", "B", "B", "C", "A", "D", "C", "A"};
    /**
     * 学生所选的选项答案  new double[50]
     */
    private String[] choice = new String[10];
    /**
     * 每个选项的得分
     */
    private int[] choiceScore = {2, 2, 4, 4, 4, 4, 4, 4, 4, 4};

    private double[] blanks = {0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0};
    private double[] blank = new double[16];
    private int[] blankScore = {0, 8, 0, 8, 0, 0, 16, 0, 8, 0, 8, 0, 0, 16, 0, 0};

    public ReDaoXiShuCeDing(String[] choice, String[] blank, String[] table1, String[] table2, String[] table3,
                            String[] table4, String[] table5, String[] table6, String[] table7, String[] table8) {

        /**
         * 接受选择题学生所选答案
         */
        for (int i = 0; i < choice.length; i++) {
            this.choice[i] = choice[i];
        }

        for (int i = 0; i < blank.length; i++) {
            if (i != 0 && i != 2 && i != 4 && i != 5 && i != 7 && i != 9 && i != 11 && i != 12 && i != 14 && i != 15) {
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
            if (i == 1 || i == 3 || i == 8 || i == 10) {
                if (blank[i] > 0 && blank[i] <= 2) {
                    score += 8;
                } else if (blank[i] > 2 && blank[i] <= 5) {
                    score += 6;
                } else if (blank[i] > 5 && blank[i] <= 10) {
                    score += 4;
                } else if (blank[i] > 10 && blank[i] <= 50) {
                    score += 2;
                } else if (blank[i] > 50) {
                    score += 0;
                }
            }

           else if (i == 6 || i == 13) {
                if (blank[i] > 0.99999 && blank[i] <= 1) {
                    score += 16;
                } else if (blank[i] > 0.9999 && blank[i] <= 0.99999) {
                    score += 14;
                } else if (blank[i] > 0.999 && blank[i] <= 0.9999) {
                    score += 12;
                } else if (blank[i] > 0.99 && blank[i] <= 0.999) {
                    score += 10;
                } else if (blank[i] > 0.9 && blank[i] <= 0.99) {
                    score += 8;
                } else if (blank[i] > 0.8 && blank[i] <= 0.9) {
                    score += 6;
                } else if (blank[i] > 0.7 && blank[i] <= 0.8) {
                    score += 4;
                } else if (blank[i] <= 0.7) {
                    score += 0;
                }
            }
        }
        return score;
    }
}



package com.nanwulife.experimentRank;

/**
 * @author 张文军
 * @Description:光片正判分类 * @Company:南京农业大学工学院
 * @version:1.0
 * @date 2019/7/2515:39
 */
public class GuangPianZhengPanPanfen {
    /**
     * 总分数
     */
    private int score = 0;
    /**
     * 正确答案
     */
    private String[] choices = {"C", "A", "A", "B", "C", "D", "A", "A", "D", "D", "A", "E", "F", "B", "F", "F"};
    /**
     * 学生所选的选项答案  new double[50]
     */
    private String[] choice = new String[16];
    /**
     * 每个选项的得分
     */
    private int[] choiceScore = {3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4};

    /**
     * 接收第三个表格判分数据
     */
    private double[] blanks = {0, 0, 0, 1, 0, 0, 0, 1, 1};
    private double[] blank = new double[9];
    private int[] blankScore = {0, 0, 0, 12, 0, 0, 0, 12, 22};

    /**
     * 接收参数
     *
     * @param choice 选择题
     * @param blank  填空题
     * @param table1 表格1数据
     * @param table2 表格2数据
     * @param table3 表格3数据
     */
    public GuangPianZhengPanPanfen(String[] choice, String[] blank, String[] table1, String[] table2, String[] table3) {

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
            if (i == 3 || i == 7){
                if (blank[i] > 0.98 && blank[i] <= 1.0) {
                    score += 12;
                } else if (blank[i] > 0.96 && blank[i] <= 0.98) {
                    score += 11;
                } else if (blank[i] > 0.94 && blank[i] <= 0.96) {
                    score += 10;
                } else if (blank[i] > 0.92 && blank[i] <= 0.94) {
                    score += 9;
                } else if (blank[i] > 0.90 && blank[i] <= 0.92) {
                    score += 8;
                } else if (blank[i] > 0.88 && blank[i] <= 0.90) {
                    score += 7;
                } else if (blank[i] > 0.86 && blank[i] <= 0.88) {
                    score += 6;
                } else {
                    score += 0;
                }
        }
              else if (i == 8) {
                   if (blank[i] <= 1.55 && blank[i] > 1.55 * 0.92) {
                       score += 22;
                   } else if (blank[i] <= 1.55 * 0.92 && blank[i] > 1.55 * 0.8) {
                       score += 18;
                   } else if (blank[i] <= 1.55 * 0.8 && blank[i] > 1.55 * 0.7) {
                       score += 14;
                   } else {
                       score += 0;
                   }
               }
        }
        return score;
    }
}


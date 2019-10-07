package com.nanwulife.experimentRank;

/**
 * @author 张文军
 * @Description:示波器 * @Company:南京农业大学工学院
 * @version:1.0
 * @date 2019/7/2515:39
 */
public class ShuZiShiBoQi {
	/**
	 * 总分数
	 */
	private int score = 0;
	/**
	 * 正确答案
	 */
	private String[] choices = {"D", "C", "E", "D", "B", "B", "C", "B", "C", "B", "B", "A", "A", "F", "K", "P", "B", "G", "L", "Q", "C", "H", "M", "R", "D", "I", "N", "S", "E", "J", "O", "T", "A", "B", "C", "D", "B", "A", "A", "B", "C", "B", "A", "B", "A", "A"};
	/**
	 * 学生所选的选项答案  new double[50]
	 */
	private String[] choice = new String[46];
	/**
	 * 每个选项的得分
	 */
	private int[] choiceScore = {3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 4, 3, 3, 3, 4};

	private double[] blanks = {1, 1, 1, 1, 1, 1};
	private double[] blank = new double[6];
	private int[] blankScore = {2, 2, 2, 2, 2, 2};


	public ShuZiShiBoQi(String[] choice, String[] blank, String[] table) {

		/**
		 * 接受选择题学生所选答案
		 */
		for (int i = 0; i < choice.length; i++) {
			this.choice[i] = choice[i];
		}

		for (int i = 0; i < blank.length; i++) {
			this.blank[i] = Double.parseDouble(blank[i]);
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
			if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5)
				if (blank[i] > 0 && blank[i] <= 5) {
					score += 2;
				} else if (blank[i] > 5 && blank[i] <= 50) {
					score += 1;
				} else {
					score += 0;
				}
		}
		return score;
	}
}


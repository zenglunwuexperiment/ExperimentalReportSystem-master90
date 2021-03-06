package com.nanwulife.experimentRank;

/**
 * @author 张文军
 * @Description:霍尔效应法测定螺线管磁场分布判分类
 * @Company:南京农业大学工学院
 * @version:1.0
 * @date 2019/5/232:59
 */
public class LuoXianGuanCiChangFenBu {
	/**
	 * 总分数
	 */
	private int score;
	/**
	 * 正确答案
	 */
	private String[] choices = {"A", "C", "B", "A", "D", "A", "B", "C", "B","B", "C","B","B","A","D"};
	/**
	 * 学生所选的选项答案  new double[50]
	 */
	private String[] choice = new String[15];
	/**
	 * 每个选项的得分
	 */
	private int[] choiceScore = {3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3};

	private double[] blanks = {0, 1, 0, 1, 0, 0, 0, 0, 0, 1};
	private double[] blank = new double[10];
	private int[] blankScore = {0, 15, 0, 15, 0, 0, 0, 0, 0, 25};

//	private double[] tables = {0, 0, 14.5, 14.5, 0, 0, 2000, 2000, 500, 500, 0, 0, 9.5, 9.5, 0, 0, 1000, 1000, 1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 23, 21, 0, 1000, 14.7, 0, 1000, 4.8};
//	private double[] table = new double[172];
//	private int[] tableScore = {0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5};

	public LuoXianGuanCiChangFenBu(String[] choice, String[] blank, String[] table) {
		for (int i = 0; i < choice.length; i++) {
			this.choice[i] = choice[i];
		}

		for (int i = 0; i < blank.length; i++) {
			if (blank[i].isEmpty()) {
				/** -0.0 表示考生没填*/
				blank[i] = "-1000";
			}
			if (i != 0 && i != 2&& i != 4&& i != 5&& i != 6&& i != 7&& i != 8) {
				this.blank[i] = Double.parseDouble(blank[i]);
			}
		}

		/*for (int i = 0; i < table.length; i++) {
			*//**除去字符串中的所有空格*//*
			table[i] = table[i].replace(" ", "");
			*//**
			 * 去掉比例中的比号" : ";
			 *//*
			table[i] = table[i].replace(":", "");
			table[i] = table[i].replace("；", "");
			if (table[i].isEmpty()) {
				*//** -0.0 表示考生没填*//*
				table[i] = "-0.0";
			}
			this.table[i] = Double.parseDouble(table[i]);
		}*/
	}

	/**
	 * 统计得分
	 *
	 * @return
	 */
	public int getScore() {
		/**选择题*/
		for (int i = 0; i < choice.length; i++) {
			if (choice[i].equals(choices[i])) {
				score += choiceScore[i];
			}
		}
		/**填空题*/
		for (int i = 0; i < blank.length; i++) {
			if (i == 1 || i == 3) {
				if (blank[i] <= 1.0 && blank[i] > 0.99) {
					score += 15;
				} else if (blank[i] <= 0.99 && blank[i] > 0.98) {
					score += 14;
				} else if (blank[i] <= 0.98 && blank[i] > 0.97) {
					score += 13;
				} else if (blank[i] <= 0.97 && blank[i] > 0.96){
					score += 12;
				} else if (blank[i] <= 0.96 && blank[i] > 0.95) {
					score += 11;
				} else if (blank[i] <= 0.95 && blank[i] > 0.94) {
					score += 10;
				} else if (blank[i] <= 0.94 && blank[i] > 0.50) {
					score += 9;
				} else if (blank[i] <= 0.5 ) {
					score += 0;
				}
			}
			else if (i == 9) {
				if (blank[i] <= 5.0) {
					score += 25;
				} else if (blank[i] <= 10 && blank[i] > 5) {
					score += 20;
				} else if (blank[i] <= 15 && blank[i] > 10) {
					score += 15;
				} else if (blank[i] <= 20 && blank[i] > 15) {
					score += 10;
				} else if (blank[i] <= 50 && blank[i] > 20) {
					score += 5;
				} else if (blank[i] > 50) {
					score += 0;
				}
			}
		}
		System.out.println(score+"sourt---------ssssssssssssssssssssssssssssssssssssss");

		/**数据表单*//*
		for (int i = 0; i < table.length; i++) {
			*//**判断相应表项数据范围*//*
			if ((i == 2 || i == 3) && (table[i] >= 14.5 || table[i] <= 15.5)) {
				score += tableScore[i];
			} else if ((i == 12 || i == 13) && (table[i] >= 9.5 || table[i] <= 10.5)) {
				score += tableScore[i];
			} else if ((i == 42) && (table[i] >= 14.7 || table[i] <= 15.3)) {
				score += tableScore[i];
			} else if ((i == 45) && (table[i] >= 4.8 || table[i] <= 5.3)) {
				score += tableScore[i];
			} else if (tables[i] == table[i]) {
				score += tableScore[i];
			}
		}*/
		return score;
	}
}













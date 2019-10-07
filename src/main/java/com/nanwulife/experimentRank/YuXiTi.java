package com.nanwulife.experimentRank;

/**
 * @Project: ExperimentalReportSystem
 * @Description: 预习题评分模块
 * @Author: Creams
 * @Date: Created in 2018/10/03
 */
public class YuXiTi {
    private String choice_1;
    private String choice_2;
    private String choice_3;
    private String choice_4;
    private String choice_5;
    private String choice_6;
    private String choice_7;
    private String choice_8;
    private String choice_9;
    private String choice_10;
    private String choice_11;
    private String choice_12;
    private String choice_13;
    private String choice_14;
    private String choice_15;
    private String choice_16;
    private String choice_17;
    private String choice_18;
    private String choice_19;
    private String choice_20;
    private int rank = 0;

    public YuXiTi(String choice_1, String choice_2,
                  String choice_3, String choice_4,
                  String choice_5, String choice_6,
                  String choice_7, String choice_8,
                  String choice_9, String choice_10,
                  String choice_11,String choice_12,
                  String choice_13, String choice_14,
                  String choice_15, String choice_16,
                  String choice_17, String choice_18,
                  String choice_19, String choice_20
    ) {
        this.choice_1 = choice_1;
        this.choice_2 = choice_2;
        this.choice_3 = choice_3;
        this.choice_4 = choice_4;
        this.choice_5 = choice_5;
        this.choice_6 = choice_6;
        this.choice_7 = choice_7;
        this.choice_8 = choice_8;
        this.choice_9 = choice_9;
        this.choice_10 = choice_10;
        this.choice_11 = choice_11;
        this.choice_12 = choice_12;
        this.choice_13 = choice_13;
        this.choice_14 = choice_14;
        this.choice_15 = choice_15;
        this.choice_16 = choice_16;
        this.choice_17 = choice_17;
        this.choice_18 = choice_18;
        this.choice_19 = choice_19;
        this.choice_20 = choice_20;
    }

    public int getRank(){
        if (choice_1.equals("C"))
            rank += 5;
        if (choice_2.equals("B"))
            rank += 5;
        if (choice_3.equals("D"))
            rank += 5;
        if (choice_4.equals("B"))
            rank += 5;
        if (choice_5.equals("C"))
            rank += 5;
        if (choice_6.equals("D"))
            rank += 5;
        if (choice_7.equals("C"))
            rank += 5;
        if (choice_8.equals("D"))
            rank += 5;
        if (choice_9.equals("D"))
            rank += 5;
        if (choice_10.equals("C"))
            rank += 5;
        if (choice_11.equals("A"))
            rank += 5;
        if (choice_12.equals("B"))
            rank += 5;
        if (choice_13.equals("D"))
            rank += 5;
        if (choice_14.equals("D"))
            rank += 5;
        if (choice_15.equals("D"))
            rank += 5;
        if (choice_16.equals("D"))
            rank += 5;
        if (choice_17.equals("C"))
            rank += 5;
        if (choice_18.equals("A"))
            rank += 5;
        if (choice_19.equals("C"))
            rank += 5;
        if (choice_20.equals("B"))
            rank += 5;
        return rank;
    }
}

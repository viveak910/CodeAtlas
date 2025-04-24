package com.dbms.CodeAtlas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "competitive_profile")
public class CompetitiveProfile {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id ;
    private String userId;
    private String cfHandle;
    private int cfRating;
    private int cfMaxRating;
    private String cfRank;
    private String cfMaxRank;
    
    private String lcHandle;  // Added LeetCode handle field
    private int lcTotalSolved;
    private int lcTotalQuestions;
    private int lcEasySolved;
    private int lcMediumSolved;
    private int lcHardSolved;
    private double lcAcceptanceRate;
    private int lcRanking;
    private String college ; 
    
    public CompetitiveProfile() {}
    
    public CompetitiveProfile(String userId, String cfHandle, int cfRating, int cfMaxRating,
                           String cfRank, String cfMaxRank, String lcHandle, int lcTotalSolved, 
                           int lcTotalQuestions, int lcEasySolved, int lcMediumSolved, 
                           int lcHardSolved, double lcAcceptanceRate, int lcRanking) {
        this.userId = userId;
        this.cfHandle = cfHandle;
        this.cfRating = cfRating;
        this.cfMaxRating = cfMaxRating;
        this.cfRank = cfRank;
        this.cfMaxRank = cfMaxRank;
        this.lcHandle = lcHandle;
        this.lcTotalSolved = lcTotalSolved;
        this.lcTotalQuestions = lcTotalQuestions;
        this.lcEasySolved = lcEasySolved;
        this.lcMediumSolved = lcMediumSolved;
        this.lcHardSolved = lcHardSolved;
        this.lcAcceptanceRate = lcAcceptanceRate;
        this.lcRanking = lcRanking;
    }
    
    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getCfHandle() {
        return cfHandle;
    }
    
    public void setCfHandle(String cfHandle) {
        this.cfHandle = cfHandle;
    }
    
    public int getCfRating() {
        return cfRating;
    }
    
    public void setCfRating(int cfRating) {
        this.cfRating = cfRating;
    }
    
    public int getCfMaxRating() {
        return cfMaxRating;
    }
    
    public void setCfMaxRating(int cfMaxRating) {
        this.cfMaxRating = cfMaxRating;
    }
    
    public String getCfRank() {
        return cfRank;
    }
    
    public void setCfRank(String cfRank) {
        this.cfRank = cfRank;
    }
    
    public String getCfMaxRank() {
        return cfMaxRank;
    }
    
    public void setCfMaxRank(String cfMaxRank) {
        this.cfMaxRank = cfMaxRank;
    }
    
    public String getLcHandle() {
        return lcHandle;
    }
    
    public void setLcHandle(String lcHandle) {
        this.lcHandle = lcHandle;
    }
    
    public int getLcTotalSolved() {
        return lcTotalSolved;
    }
    
    public void setLcTotalSolved(int lcTotalSolved) {
        this.lcTotalSolved = lcTotalSolved;
    }
    
    public int getLcTotalQuestions() {
        return lcTotalQuestions;
    }
    
    public void setLcTotalQuestions(int lcTotalQuestions) {
        this.lcTotalQuestions = lcTotalQuestions;
    }
    
    public int getLcEasySolved() {
        return lcEasySolved;
    }
    
    public void setLcEasySolved(int lcEasySolved) {
        this.lcEasySolved = lcEasySolved;
    }
    
    public int getLcMediumSolved() {
        return lcMediumSolved;
    }
    
    public void setLcMediumSolved(int lcMediumSolved) {
        this.lcMediumSolved = lcMediumSolved;
    }
    
    public int getLcHardSolved() {
        return lcHardSolved;
    }
    
    public void setLcHardSolved(int lcHardSolved) {
        this.lcHardSolved = lcHardSolved;
    }
    
    public double getLcAcceptanceRate() {
        return lcAcceptanceRate;
    }
    
    public void setLcAcceptanceRate(double lcAcceptanceRate) {
        this.lcAcceptanceRate = lcAcceptanceRate;
    }
    
    public int getLcRanking() {
        return lcRanking;
    }
    
    public void setLcRanking(int lcRanking) {
        this.lcRanking = lcRanking;
    }
    public String getCollege() {
        return college;
    }
    public void setCollege(String college) {
        this.college = college;
    }
    
    @Override
    public String toString() {
        return "CompetitiveProfile{" +
                "userId='" + userId + '\'' +
                ", cfHandle='" + cfHandle + '\'' +
                ", cfRating=" + cfRating +
                ", cfMaxRating=" + cfMaxRating +
                ", cfRank='" + cfRank + '\'' +
                ", cfMaxRank='" + cfMaxRank + '\'' +
                ", lcHandle='" + lcHandle + '\'' +
                ", lcTotalSolved=" + lcTotalSolved +
                ", lcTotalQuestions=" + lcTotalQuestions +
                ", lcEasySolved=" + lcEasySolved +
                ", lcMediumSolved=" + lcMediumSolved +
                ", lcHardSolved=" + lcHardSolved +
                ", lcAcceptanceRate=" + lcAcceptanceRate +
                ", lcRanking=" + lcRanking +
                '}';
    }
}
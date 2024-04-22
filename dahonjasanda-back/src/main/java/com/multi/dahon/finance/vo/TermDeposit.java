package com.multi.dahon.finance.vo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;

@Entity
@Getter
public class TermDeposit { // 정기예금
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String dclsMonth;
    
    @Column(nullable = false)
    private String finCoNo;
    
    @Column(nullable = false)
    private String finPrdtCd;
    
    @Column(nullable = false)
    private String korCoNm;
    
    @Column(nullable = false)
    private String finPrdtNm;
    
    @Column
    private String joinWay;
    
    @Column(nullable = false)
    private String mtrtInt; // Consider storing as TEXT due to its length and structure
    
    @Column(nullable = false)
    private String spclCnd;
    
    @Column(nullable = false)
    private String joinDeny;
    
    @Column(nullable = false)
    private String joinMember;
    
    @Column(nullable = false)
    private String etcNote;
    
    @Column(nullable = true)
    private Long maxLimit; // Can be null
    
    @Column(nullable = false)
    private LocalDate dclsStrtDay;
    
    @Column(nullable = true)
    private LocalDate dclsEndDay; // Can be null
    
    @Column(nullable = false)
    private LocalDateTime finCoSubmDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "financial_company_id")
    private FinancialCompany financialCompany;

    @OneToMany(mappedBy = "termDeposit", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<TermDepositOption> options = new HashSet<>();

    
    protected TermDeposit() {
    }

    public TermDeposit(String dclsMonth, String finCoNo, String finPrdtCd, String korCoNm, String finPrdtNm, String joinWay, String mtrtInt, String spclCnd, String joinDeny, String joinMember, String etcNote, Long maxLimit, LocalDate dclsStrtDay, LocalDate dclsEndDay, LocalDateTime finCoSubmDay) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.korCoNm = korCoNm;
        this.finPrdtNm = finPrdtNm;
        this.joinWay = joinWay;
        this.mtrtInt = mtrtInt;
        this.spclCnd = spclCnd;
        this.joinDeny = joinDeny;
        this.joinMember = joinMember;
        this.etcNote = etcNote;
        this.maxLimit = maxLimit;
        this.dclsStrtDay = dclsStrtDay;
        this.dclsEndDay = dclsEndDay;
        this.finCoSubmDay = finCoSubmDay;
    }
}

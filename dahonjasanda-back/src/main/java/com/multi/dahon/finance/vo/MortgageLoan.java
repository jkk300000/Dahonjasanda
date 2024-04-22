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
public class MortgageLoan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String dclsMonth;
    
    @Column
    private String finCoNo;
    
    @Column
    private String finPrdtCd;
    
    @Column
    private String korCoNm;
    
    @Column
    private String finPrdtNm;
    
    @Column
    private String joinWay;
    
    @Column
    private String loanInciExpn;
    
    @Column
    private String erlyRpayFee;
    
    @Column
    private String dlyRate;
    
    @Column
    private String loanLmt;
    
    @Column
    private LocalDate dclsStrtDay;
    
    @Column
    private LocalDate dclsEndDay; // Can be null
    
    @Column
    private LocalDateTime finCoSubmDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "financial_company_id")
    private FinancialCompany financialCompany;

    @OneToMany(mappedBy = "mortgageLoan", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<MortgageLoanOption> options = new HashSet<>();
    
    // jpa 기본 스펙을 위한 생성자, 사용하지 말 것, all Arg 생성자는 밑에
    protected MortgageLoan() {
    }

    public MortgageLoan(String dclsMonth, String finCoNo, String finPrdtCd, String korCoNm, String finPrdtNm, String joinWay, String loanInciExpn, String erlyRpayFee, String dlyRate, String loanLmt, LocalDate dclsStrtDay, LocalDate dclsEndDay, LocalDateTime finCoSubmDay) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.korCoNm = korCoNm;
        this.finPrdtNm = finPrdtNm;
        this.joinWay = joinWay;
        this.loanInciExpn = loanInciExpn;
        this.erlyRpayFee = erlyRpayFee;
        this.dlyRate = dlyRate;
        this.loanLmt = loanLmt;
        this.dclsStrtDay = dclsStrtDay;
        this.dclsEndDay = dclsEndDay;
        this.finCoSubmDay = finCoSubmDay;
    }

}
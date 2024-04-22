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
public class CreditLoan {
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
    private String crdtPrdtType;
    
    @Column
    private String korCoNm;
    
    @Column
    private String finPrdtNm;
    
    @Column
    private String joinWay;
    
    @Column
    private String cbName;
    
    @Column
    private String crdtPrdtTypeNm;
    
    @Column
    private LocalDate dclsStrtDay;
    
    @Column
    private LocalDate dclsEndDay; // Can be null
    
    @Column
    private LocalDateTime finCoSubmDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "financial_company_id")
    private FinancialCompany financialCompany;

    @OneToMany(mappedBy = "creditLoan", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<CreditLoanOption> options = new HashSet<>();

    
    protected CreditLoan() {
    }

    public CreditLoan(String dclsMonth, String finCoNo, String finPrdtCd, String crdtPrdtType, String korCoNm, String finPrdtNm, String joinWay, String cbName, String crdtPrdtTypeNm, LocalDate dclsStrtDay, LocalDate dclsEndDay, LocalDateTime finCoSubmDay) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.crdtPrdtType = crdtPrdtType;
        this.korCoNm = korCoNm;
        this.finPrdtNm = finPrdtNm;
        this.joinWay = joinWay;
        this.cbName = cbName;
        this.crdtPrdtTypeNm = crdtPrdtTypeNm;
        this.dclsStrtDay = dclsStrtDay;
        this.dclsEndDay = dclsEndDay;
        this.finCoSubmDay = finCoSubmDay;
    }

}
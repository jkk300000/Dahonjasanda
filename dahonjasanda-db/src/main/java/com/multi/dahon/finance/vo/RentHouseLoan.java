package com.multi.dahon.finance.vo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
public class RentHouseLoan{

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

    @OneToMany(mappedBy = "rentHouseLoan", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RentHouseLoanOption> options = new HashSet<>();

    protected RentHouseLoan() {
    }

    public RentHouseLoan(String dclsMonth, String finCoNo, String finPrdtCd, String korCoNm, String finPrdtNm, String joinWay, String loanInciExpn, String erlyRpayFee, String dlyRate, String loanLmt, LocalDate dclsStrtDay, LocalDate dclsEndDay, LocalDateTime finCoSubmDay) {
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

    public String identifying(){
        return getFinCoNo() + "_" + getFinPrdtCd();
    }
}
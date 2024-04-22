package com.multi.dahon.finance.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class CreditLoanOption {
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
    private String crdtLendRateType;
    
    @Column
    private String crdtLendRateTypeNm;
    
    @Column
    private BigDecimal crdtGrad1; // Can be null
    
    @Column
    private BigDecimal crdtGrad4; // Can be null
    
    @Column
    private BigDecimal crdtGrad5; // Can be null
    
    @Column
    private BigDecimal crdtGrad6; // Can be null
    
    @Column
    private BigDecimal crdtGrad10; // Can be null
    
    @Column
    private BigDecimal crdtGrad11; // Can be null
    
    @Column
    private BigDecimal crdtGrad12; // Can be null
    
    @Column
    private BigDecimal crdtGrad13; // Can be null
    
    @Column
    private BigDecimal crdtGradAvg; // Can be null

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credit_loan_id")
    private CreditLoan creditLoan;

    protected CreditLoanOption() {
    }

    public CreditLoanOption(String dclsMonth, String finCoNo, String finPrdtCd, String crdtPrdtType, String crdtLendRateType, String crdtLendRateTypeNm, BigDecimal crdtGrad1, BigDecimal crdtGrad4, BigDecimal crdtGrad5, BigDecimal crdtGrad6, BigDecimal crdtGrad10, BigDecimal crdtGrad11, BigDecimal crdtGrad12, BigDecimal crdtGrad13, BigDecimal crdtGradAvg) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.crdtPrdtType = crdtPrdtType;
        this.crdtLendRateType = crdtLendRateType;
        this.crdtLendRateTypeNm = crdtLendRateTypeNm;
        this.crdtGrad1 = crdtGrad1;
        this.crdtGrad4 = crdtGrad4;
        this.crdtGrad5 = crdtGrad5;
        this.crdtGrad6 = crdtGrad6;
        this.crdtGrad10 = crdtGrad10;
        this.crdtGrad11 = crdtGrad11;
        this.crdtGrad12 = crdtGrad12;
        this.crdtGrad13 = crdtGrad13;
        this.crdtGradAvg = crdtGradAvg;
    }

    public String identifying(){
        return getFinCoNo() + "_" + getFinPrdtCd() + "_" + getCrdtPrdtType();
    }

    // 연관관계 편의 메소드 !!!!
    public void setCreditLoan(CreditLoan creditLoan) {
        this.creditLoan = creditLoan;
        creditLoan.getOptions().add(this);
    }


}
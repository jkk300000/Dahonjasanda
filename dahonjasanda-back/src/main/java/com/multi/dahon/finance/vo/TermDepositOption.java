package com.multi.dahon.finance.vo;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class TermDepositOption {
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
    private String intrRateType;
    
    @Column(nullable = false)
    private String intrRateTypeNm;
    
    @Column(nullable = false)
    private Integer saveTrm; // Saving term in months
    
    @Column
    private BigDecimal intrRate;
    
    @Column
    private BigDecimal intrRate2; // Highest preferential interest rate

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "term_deposit_id")
    private TermDeposit termDeposit;

    public void setTermDeposit(TermDeposit termDeposit) {
        this.termDeposit = termDeposit;
        termDeposit.getOptions().add(this);
    }
    

    protected TermDepositOption() {
    }

    public TermDepositOption(String dclsMonth, String finCoNo, String finPrdtCd, String intrRateType, String intrRateTypeNm, Integer saveTrm, BigDecimal intrRate, BigDecimal intrRate2) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.intrRateType = intrRateType;
        this.intrRateTypeNm = intrRateTypeNm;
        this.saveTrm = saveTrm;
        this.intrRate = intrRate;
        this.intrRate2 = intrRate2;
    }
}

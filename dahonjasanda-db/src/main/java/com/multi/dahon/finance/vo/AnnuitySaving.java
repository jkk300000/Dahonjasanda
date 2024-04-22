package com.multi.dahon.finance.vo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class AnnuitySaving {
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
    private String pnsnKind;
    
    @Column
    private String pnsnKindNm;
    
    @Column
    private LocalDate saleStrtDay;
    
    @Column
    private Long mntnCnt;
    
    @Column
    private String prdtType;
    
    @Column
    private String prdtTypeNm;
    
    @Column
    private BigDecimal avgPrftRate;
    
    @Column
    private String dclsRate; // Can be null
    
    @Column
    private String guarRate; // Can be null
    
    @Column
    private BigDecimal btrmPrftRate1;
    
    @Column
    private BigDecimal btrmPrftRate2;
    
    @Column
    private BigDecimal btrmPrftRate3;
    
    @Column
    private String etc;
    
    @Column
    private String saleCo;
    
    @Column
    private LocalDate dclsStrtDay;
    
    @Column
    private LocalDate dclsEndDay; // Can be null
    
    @Column
    private LocalDateTime finCoSubmDay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "financial_company_id")
    private FinancialCompany financialCompany;

    @OneToMany(mappedBy = "annuitySaving", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AnnuitySavingOption> options = new HashSet<>();

    public String identifying() {
        return getFinCoNo() + "_" + getFinPrdtCd();
    }

    protected AnnuitySaving() {
    }

    public AnnuitySaving(String dclsMonth, String finCoNo, String finPrdtCd, String korCoNm, String finPrdtNm, String joinWay, String pnsnKind, String pnsnKindNm, LocalDate saleStrtDay, Long mntnCnt, String prdtType, String prdtTypeNm, BigDecimal avgPrftRate, String dclsRate, String guarRate, BigDecimal btrmPrftRate1, BigDecimal btrmPrftRate2, BigDecimal btrmPrftRate3, String etc, String saleCo, LocalDate dclsStrtDay, LocalDate dclsEndDay, LocalDateTime finCoSubmDay) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.korCoNm = korCoNm;
        this.finPrdtNm = finPrdtNm;
        this.joinWay = joinWay;
        this.pnsnKind = pnsnKind;
        this.pnsnKindNm = pnsnKindNm;
        this.saleStrtDay = saleStrtDay;
        this.mntnCnt = mntnCnt;
        this.prdtType = prdtType;
        this.prdtTypeNm = prdtTypeNm;
        this.avgPrftRate = avgPrftRate;
        this.dclsRate = dclsRate;
        this.guarRate = guarRate;
        this.btrmPrftRate1 = btrmPrftRate1;
        this.btrmPrftRate2 = btrmPrftRate2;
        this.btrmPrftRate3 = btrmPrftRate3;
        this.etc = etc;
        this.saleCo = saleCo;
        this.dclsStrtDay = dclsStrtDay;
        this.dclsEndDay = dclsEndDay;
        this.finCoSubmDay = finCoSubmDay;
    }
}
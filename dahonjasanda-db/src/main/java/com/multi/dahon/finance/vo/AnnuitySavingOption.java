package com.multi.dahon.finance.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class AnnuitySavingOption {
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
    private String pnsnRecpTrm;
    
    @Column(nullable = false)
    private String pnsnRecpTrmNm;
    
    @Column(nullable = false)
    private Integer pnsnEntrAge;
    
    @Column(nullable = false)
    private String pnsnEntrAgeNm;
    
    @Column(nullable = false)
    private BigDecimal monPaymAtm;
    
    @Column(nullable = false)
    private String monPaymAtmNm;
    
    @Column(nullable = false)
    private Integer paymPrd;
    
    @Column(nullable = false)
    private String paymPrdNm;
    
    @Column(nullable = false)
    private Integer pnsnStrtAge;
    
    @Column(nullable = false)
    private String pnsnStrtAgeNm;
    
    @Column(nullable = false)
    private Long pnsnRecpAmt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "annuity_saving_id")
    private AnnuitySaving annuitySaving;

    public String identifying() {
        return getFinCoNo() + "_" + getFinPrdtCd();
    }

    public void setAnnuitySaving(AnnuitySaving annuitySaving) {
        this.annuitySaving = annuitySaving;
        annuitySaving.getOptions().add(this);
    }

    protected AnnuitySavingOption() {
    }

    public AnnuitySavingOption(String dclsMonth, String finCoNo, String finPrdtCd, String pnsnRecpTrm, String pnsnRecpTrmNm, Integer pnsnEntrAge, String pnsnEntrAgeNm, BigDecimal monPaymAtm, String monPaymAtmNm, Integer paymPrd, String paymPrdNm, Integer pnsnStrtAge, String pnsnStrtAgeNm, Long pnsnRecpAmt) {
        this.dclsMonth = dclsMonth;
        this.finCoNo = finCoNo;
        this.finPrdtCd = finPrdtCd;
        this.pnsnRecpTrm = pnsnRecpTrm;
        this.pnsnRecpTrmNm = pnsnRecpTrmNm;
        this.pnsnEntrAge = pnsnEntrAge;
        this.pnsnEntrAgeNm = pnsnEntrAgeNm;
        this.monPaymAtm = monPaymAtm;
        this.monPaymAtmNm = monPaymAtmNm;
        this.paymPrd = paymPrd;
        this.paymPrdNm = paymPrdNm;
        this.pnsnStrtAge = pnsnStrtAge;
        this.pnsnStrtAgeNm = pnsnStrtAgeNm;
        this.pnsnRecpAmt = pnsnRecpAmt;
    }
}
package com.multi.dahon.housing.model.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity(name = "HOUSING_TYPE")
@Transactional
public class HousingInfoByTypeJPA {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tno;
	@Column(unique = false, nullable = true, length = 100)
 	private int  	etcHshldco;
	@Column(unique = false, nullable = true, length = 100)
 	private String houseManageNoInType;
	@Column(unique = false, nullable = true, length = 100)
    private String  houseTy;
	@Column(unique = false, nullable = true, length = 100)
    private int  insttRecomendHshldco;
	@Column(unique = false, nullable = true, length = 100)
	private int  lfeFrstHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private int  lttotTopAmount;
	@Column(unique = false, nullable = true, length = 100)
    private int  mnychHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private String  modelNo;
	@Column(unique = false, nullable = true, length = 100)
    private int  nwwdsHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private int  oldParntsSuportHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private int  spsplyHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private String  suplyAr;
	@Column(unique = false, nullable = true, length = 100)
    private int  suplyHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private int  transrInsttEnfsnHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private String  gp;
	@Column(unique = false, nullable = true, length = 100)
    private String  tp;
	@Column(unique = false, nullable = true, length = 100)
    private String  excluseAr;
	@Column(unique = false, nullable = true, length = 100)
    private String  cntrctAr;
	@Column(unique = false, nullable = true, length = 100)
    private int  gnsplyHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private int  spsplyAgedHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private int  spsplyNewMrrgHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private int  subscrptReqstAmount;
	@Column(unique = false, nullable = true, length = 100)
    private int spsplyYgmnHshldco;
	

}

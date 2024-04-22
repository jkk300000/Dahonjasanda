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
@Entity(name = "HOUSING")
@Transactional
public class HousingInfoJPA {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int hno;
	@Column(unique = false, nullable = true, length = 100)
	private String  bsnsMbyNm;
	@Column(unique = false, nullable = true, length = 100)
	private String  cnstrctEntrpsNm;
	@Column(unique = false, nullable = true, length = 100)
	private String  cntrctCnclsBgnde;
	@Column(unique = false, nullable = true, length = 100)
	private String  cntrctCnclsEndde;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRceptBgnde;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRceptEndde;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRnk1CrspareaRceptPd;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRnk1EtcAreaRcptdePd;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRnk1EtcGgRcptdePd;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRnk2CrspareaRceptPd;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRnk2EtcAreaRcptdePd;
	@Column(unique = false, nullable = true, length = 100)
	private String  gnrlRnk2EtcGgRcptdePd;
	@Column(unique = false, nullable = true, length = 100)
	private String  hmpgAdres;
	@Column(unique = false, nullable = true, length = 100)
	private String  houseDtlSecd;
	@Column(unique = false, nullable = true, length = 100)
	private String  houseDtlSecdNm;
	@Column(unique = false, nullable = true, length = 100)
	private String  houseManageNo;
	@Column(unique = false, nullable = true, length = 100)
	private String  houseNm;
	@Column(unique = false, nullable = true, length = 100)
	private String  houseSecd;
	@Column(unique = false, nullable = true, length = 100)
	private String  houseSecdNm;
	@Column(unique = false, nullable = true, length = 100)
	private String  hssplyAdres;
	@Column(unique = false, nullable = true, length = 100)
	private String  hssplyZip;
	@Column(unique = false, nullable = true, length = 100)
	private String  imprmnBsnsAt;
	@Column(unique = false, nullable = true, length = 100)
	private String  lrsclBldlndAt;
	@Column(unique = false, nullable = true, length = 100)
	private String  mdatTrgetAreaSecd;
	@Column(unique = false, nullable = true, length = 100)	
	private String  mdhsTelno;
	@Column(unique = false, nullable = true, length = 100)
	private String  mvnPrearngeYm;
	@Column(unique = false, nullable = true, length = 100)
	private String  nplnPrvoprPublicHouseAt;
	@Column(unique = false, nullable = true, length = 100)
	private String  parcprcUlsAt;
	@Column(unique = false, nullable = true, length = 100)
	private String  pblancNo;
	@Column(unique = false, nullable = true, length = 500)
	private String  pblancUrl;
	@Column(unique = false, nullable = true, length = 100)
	private String  przwnerPresnatnDe;
	@Column(unique = false, nullable = true, length = 100)
	private String  publicHouseEarthAt;
	@Column(unique = false, nullable = true, length = 100)
	private String  rceptBgnde;
	@Column(unique = false, nullable = true, length = 100)
	private String  rceptEndde;
	@Column(unique = false, nullable = true, length = 100)
	private String  rcritPblancDe;
	@Column(unique = false, nullable = true, length = 100)
    private String  rentSecd;
	@Column(unique = false, nullable = true, length = 100)
    private String  rentSecdNm;
	@Column(unique = false, nullable = true, length = 100)
    private String  specltRdnEarthAt;
	@Column(unique = false, nullable = true, length = 100)
    private String  spsplyRceptBgnde;
	@Column(unique = false, nullable = true, length = 100)
    private String  spsplyRceptEndde;
	@Column(unique = false, nullable = true, length = 100)
    private String  subscrptAreaCode;
	@Column(unique = false, nullable = true, length = 100)
    private String  subscrptAreaCodeNm;
	@Column(unique = false, nullable = true, length = 100)
    private int  	totSuplyHshldco;
	@Column(unique = false, nullable = true, length = 100)
    private String  searchHouseSecd;
	@Column(unique = false, nullable = true, length = 100)
    private String  houseDetailSecd;
	@Column(unique = false, nullable = true, length = 100)
    private String  houseDetailSecdNm;
	

}

package com.multi.dahon.stock.model.vo;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "STOCK")
@Transactional
public class Stock {
	
	@Id
	public int sno;
	
	@Column
	public int sdate;
	@Column
	public int sgap;
	@Column(length = 30)
	public String scode;
	@Column(length = 30)
	public String sname;
	@Column
	public int clpr;
	@Column
	public int mkp;
	@Column
	public int hipr;
	@Column
	public int lopr;
	@Column
	public String code;
	@Column
	public int price;
	@Column
	public int yprice;
	@Column
	public int open;
	@Column
	public int high;
	@Column
	public int low;
	@Column(length = 30)
	public String volume;
	@Column(length = 30)
	public String onevolume;
	@Column(length = 30)
	public String total;
	@Column(length = 30)
	public String foreignapb;
	@Column(length = 30)
	public String investinfo;
	@Column(length = 30)
	public String targetprice;
	@Column(length = 30)
	public String topprice;
	@Column(length = 30)
	public String bottomprice;
	@Column(length = 30)
	public String per;
	@Column(length = 30)
	public String eps;
	@Column(length = 1000)
	public String content;
	@Column(length = 30)
	public String sellname1;
	@Column(length = 30)
	public String sellname2;
	@Column(length = 30)
	public String sellname3;
	@Column(length = 30)
	public String sellname4;
	@Column(length = 30)
	public String sellname5;
	@Column(length = 30)
	public String sell1;
	@Column(length = 30)
	public String sell2;
	@Column(length = 30)
	public String sell3;
	@Column(length = 30)
	public String sell4;
	@Column(length = 30)
	public String sell5;
	@Column(length = 30)
	public String buyname1;
	@Column(length = 30)
	public String buyname2;
	@Column(length = 30)
	public String buyname3;
	@Column(length = 30)
	public String buyname4;
	@Column(length = 30)
	public String buyname5;
	@Column(length = 30)
	public String buy1;
	@Column(length = 30)
	public String buy2;
	@Column(length = 30)
	public String buy3;
	@Column(length = 30)
	public String buy4;
	@Column(length = 30)
	public String buy5;
	@Column(length = 30)
	public String foreignsell;
	@Column(length = 30)
	public String foreigngap;
	@Column(length = 30)
	public String foreignbuy;
	@Column(length = 30)
	public String date1;
	@Column(length = 30)
	public String date2;
	@Column(length = 30)
	public String date3;
	@Column(length = 30)
	public String date4;
	@Column(length = 30)
	public String date5;
	@Column(length = 30)
	public String date6;
	@Column(length = 30)
	public String valueprice1;
	@Column(length = 30)
	public String valuegap1;
	@Column(length = 30)
	public String valueforeigner1;
	@Column(length = 30)
	public String valueorgan1;
	@Column(length = 30)
	public String valueprice2;
	@Column(length = 30)
	public String valuegap2;
	@Column(length = 30)
	public String valueforeigner2;
	@Column(length = 30)
	public String valueorgan2;
	@Column(length = 30)
	public String valueprice3;
	@Column(length = 30)
	public String valuegap3;
	@Column(length = 30)
	public String valueforeigner3;
	@Column(length = 30)
	public String valueorgan3;
	@Column(length = 30)
	public String valueprice4;
	@Column(length = 30)
	public String valuegap4;
	@Column(length = 30)
	public String valueforeigner4;
	@Column(length = 30)
	public String valueorgan4;
	@Column(length = 30)
	public String valueprice5;
	@Column(length = 30)
	public String valuegap5;
	@Column(length = 30)
	public String valueforeigner5;
	@Column(length = 30)
	public String valueorgan5;
	@Column(length = 30)
	public String valueprice6;
	@Column(length = 30)
	public String valuegap6;
	@Column(length = 30)
	public String valueforeigner6;
	@Column(length = 30)
	public String valueorgan6;
	@OneToMany(mappedBy = "stock")
	public List<StockPrice> sprice;
	
	@Override
	public String toString() {
		return "Stock [sno=" + sno + ", sdate=" + sdate + ", sgap=" + sgap + ", scode=" + scode + ", sname=" + sname
				+ ", clpr=" + clpr + ", mkp=" + mkp + ", hipr=" + hipr + ", lopr=" + lopr + ", code=" + code
				+ ", price=" + price + ", yprice=" + yprice + ", open=" + open + ", high=" + high + ", low=" + low
				+ ", volume=" + volume + ", onevolume=" + onevolume + ", total=" + total + ", foreignapb=" + foreignapb
				+ ", investinfo=" + investinfo + ", targetprice=" + targetprice + ", topprice=" + topprice
				+ ", bottomprice=" + bottomprice + ", per=" + per + ", eps=" + eps + ", content=" + content
				+ ", sellname1=" + sellname1 + ", sellname2=" + sellname2 + ", sellname3=" + sellname3 + ", sellname4="
				+ sellname4 + ", sellname5=" + sellname5 + ", sell1=" + sell1 + ", sell2=" + sell2 + ", sell3=" + sell3
				+ ", sell4=" + sell4 + ", sell5=" + sell5 + ", buyname1=" + buyname1 + ", buyname2=" + buyname2
				+ ", buyname3=" + buyname3 + ", buyname4=" + buyname4 + ", buyname5=" + buyname5 + ", buy1=" + buy1
				+ ", buy2=" + buy2 + ", buy3=" + buy3 + ", buy4=" + buy4 + ", buy5=" + buy5 + ", foreignsell="
				+ foreignsell + ", foreigngap=" + foreigngap + ", foreignbuy=" + foreignbuy + ", date1=" + date1
				+ ", date2=" + date2 + ", date3=" + date3 + ", date4=" + date4 + ", date5=" + date5 + ", date6=" + date6
				+ ", valueprice1=" + valueprice1 + ", valuegap1=" + valuegap1 + ", valueforeigner1=" + valueforeigner1
				+ ", valueorgan1=" + valueorgan1 + ", valueprice2=" + valueprice2 + ", valuegap2=" + valuegap2
				+ ", valueforeigner2=" + valueforeigner2 + ", valueorgan2=" + valueorgan2 + ", valueprice3="
				+ valueprice3 + ", valuegap3=" + valuegap3 + ", valueforeigner3=" + valueforeigner3 + ", valueorgan3="
				+ valueorgan3 + ", valueprice4=" + valueprice4 + ", valuegap4=" + valuegap4 + ", valueforeigner4="
				+ valueforeigner4 + ", valueorgan4=" + valueorgan4 + ", valueprice5=" + valueprice5 + ", valuegap5="
				+ valuegap5 + ", valueforeigner5=" + valueforeigner5 + ", valueorgan5=" + valueorgan5 + ", valueprice6="
				+ valueprice6 + ", valuegap6=" + valuegap6 + ", valueforeigner6=" + valueforeigner6 + ", valueorgan6="
				+ valueorgan6 + "]";
	}
	
	

	

}

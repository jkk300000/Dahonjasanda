package com.multi.dahon.stock.model.vo;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.multi.dahon.member.model.vo.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Transactional
@DynamicInsert
@DynamicUpdate
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
public class StockTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int stno;

	@Column(length = 30)
	public String sdate;

	@Column
	public int price;

	@Column(length = 30)
	public String scode;

	@Column(length = 30)
	public String sname;
	
	@Column
	public int sno;

	@Column(length = 30)
	public String createDate;

	@Override
	public String toString() {
		return "StockTime [stno=" + stno + ", sdate=" + sdate + ", price=" + price + ", scode=" + scode + ", sname="
				+ sname + ", createDate=" + createDate + "]";
	}

}

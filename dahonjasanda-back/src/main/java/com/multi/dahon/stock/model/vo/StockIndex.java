package com.multi.dahon.stock.model.vo;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Entity(name="STOCKINDEX")
@Transactional
@DynamicInsert
@DynamicUpdate
public class StockIndex {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int sino;
	
	@Column
	public int sdate;

	@Column(length = 30)
	public String indexname;

	@Column(length = 10)
	public String gap;

	@Column
	public double clpr;

	@Column
	public double mkp;

	@Column
	public double hipr;

	@Column
	public double lopr;

	@Override
	public String toString() {
		return "StockIndex [sino=" + sino + ", sdate=" + sdate + ", indexname=" + indexname + ", gap=" + gap + ", clpr="
				+ clpr + ", mkp=" + mkp + ", hipr=" + hipr + ", lopr=" + lopr + "]";
	}

}

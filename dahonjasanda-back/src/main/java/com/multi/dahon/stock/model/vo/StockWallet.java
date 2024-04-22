package com.multi.dahon.stock.model.vo;

import com.multi.dahon.member.model.vo.Member;

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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "STOCKWALLET")
@Transactional
public class StockWallet {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int wno;
	
	@Column
	public int price;
	
	@Column
	public int quantity;
	
	@Column
	public String sname;
	
	@ManyToOne
	private Member member;

	@Override
	public String toString() {
		return "StockWallet [wno=" + wno + ", price=" + price + ", sname=" + sname + ", member=" + member + "]";
	}
}

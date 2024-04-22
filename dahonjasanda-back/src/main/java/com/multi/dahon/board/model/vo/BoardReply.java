package com.multi.dahon.board.model.vo;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity // 객체를 Table로 생성 시켜주는 어노테이션
@Transactional
@DynamicInsert
@DynamicUpdate
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
public class BoardReply {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int rno;
	
	@Column(columnDefinition = "TEXT")
	private String content;	
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date modifyDate;
	
	private String status;
	
	@ManyToOne
	private Member member;
	
	@ManyToOne
	@JsonIgnore
    private Board board;
	
	@Override
	public String toString() {
		return "Reply [rno=" + rno + ", content=" + content + ", createDate=" + createDate + ", modifyDate="
				+ modifyDate + "]";
	}
}

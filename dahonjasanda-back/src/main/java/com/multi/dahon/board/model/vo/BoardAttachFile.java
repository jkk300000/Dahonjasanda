package com.multi.dahon.board.model.vo;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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
public class BoardAttachFile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int fno;
	
	@Column(length = 1000)
	private String originalFilename;
	@Column(length = 1000)
	private String renamedFilename;
	
	@ManyToOne
	@JsonIgnore
    private Board board;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createDate;
}

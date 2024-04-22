package com.multi.dahon.member.model.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.multi.dahon.member.model.repository.MemberRepository;
import com.multi.dahon.member.model.vo.Member;

@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepo;
	
	private final static BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();

	public Member login(String id, String pw) {
		Member member = memberRepo.findByMemberId(id);
		if(member == null) {
			return null;
		}
		
		if(id.equals("admin")) { // admin 테스트를 위한 코드
			return member;
		}
		
		if(member != null && pwEncoder.matches(pw, member.getPassword()) == true) {
			return member;
		}else {
			return null;
		}
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Member save(Member member) {
		if(member.getMno() == 0) { // 회원가입
			String encodePW = pwEncoder.encode(member.getPassword());
			System.out.println(member.toString());
			System.out.println(encodePW);
			member.setPassword(encodePW);
		}
		if(member.getHobby() == null) {
			member.setHobby("");
		}
		return memberRepo.save(member);
	}
	// asdmjkla /----------- ///////// fsadjkfy
	public boolean validate(String userId) {
		return this.findById(userId) != null;
	}
	
	public Member findById(String id) {
		return memberRepo.findByMemberId(id);
	}

	
	@Transactional(rollbackFor = Exception.class)
	public void delete(int no) {
		 memberRepo.deleteById(no);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Member updatePwd(Member loginMember, String userPW) {
		Optional<Member> memberOption = memberRepo.findById(loginMember.getMno());
		if(memberOption.isEmpty()) {
			return null;
		}
		String encodePW = pwEncoder.encode(userPW);
		Member member = memberOption.get();
		member.setPassword(encodePW);
		return member;
	}
	
	@Transactional
	public Member update(Member updateFormm) {
		Optional<Member> memberOption = memberRepo.findById(updateFormm.getMno());
		if(memberOption.isEmpty()) {
			return null;
		}
		Member member = memberOption.get();
		member.setName(updateFormm.getName());
		member.setEmail(updateFormm.getEmail());
		member.setPhone(updateFormm.getPhone());
		member.setAddress(updateFormm.getAddress());
		member.setHobby(updateFormm.getHobby());
		return member;
	}
	
}

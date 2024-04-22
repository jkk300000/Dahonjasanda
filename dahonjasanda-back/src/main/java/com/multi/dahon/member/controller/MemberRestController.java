package com.multi.dahon.member.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.multi.dahon.member.model.service.MemberService;
import com.multi.dahon.member.model.vo.Member;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SessionAttributes("loginMember") // loginMember를 Model 취급할때 세션으로 처리하도록 도와주는 어노테이션
@RestController
@RequestMapping("/memberRest")
@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 5000)
@Tag(name = "Member Rest API", description = "Member에 대한 정보를 제공합니다.")
public class MemberRestController {

	@Autowired
	private MemberService service;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(
			String id, String pwd, HttpSession session) {
		System.out.println("id : " + id + ", pwd : " + pwd);
		Member loginMember = service.login(id, pwd);
		Map<String, Object> map = new HashMap<>();

		if (loginMember != null) { // 성공
			map.put("result", true);
			map.put("member", loginMember);
			session.setAttribute("loginMember", loginMember);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		} else { // 실패
			map.put("result", false);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}
	}

	@GetMapping("/loginInfo")
	public ResponseEntity<Map<String, Object>> getLoginInfo(
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Object> map = new HashMap<>();
		System.out.println("!!" + loginMember);
		if (loginMember != null) { // 성공
			map.put("result", true);
			map.put("member", loginMember);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		} else { // 실패
			map.put("result", false);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}
	}

	@GetMapping("/logout")
	public ResponseEntity<Map<String, Object>> logout(SessionStatus status) { // status : 세션의 상태 확인과 해제가 가능한 클래스
		status.setComplete();
		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@PostMapping(path = "/enroll")
	public ResponseEntity<Map<String, Object>> enroll(Model model, 
			Member member) throws UnsupportedEncodingException {
		System.out.println(member);
		Map<String, Object> map = new HashMap<>();
		Member result = service.save(member);
		if (result != null) { // 성공
			map.put("result", true);
			map.put("member", result);
		} else { // 실패
			map.put("result", false);
		}
		System.out.println(map);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	// AJAX 회원아이디 중복 검사부
	@GetMapping("/idCheck")
	public ResponseEntity<Map<String, Object>> idCheck(String memberId) {
		log.info("아이디 중복 확인 : " + memberId);

		boolean result = service.validate(memberId);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("validate", result);

		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@PostMapping(path = "/update")
	public ResponseEntity<Map<String, Object>> update(Model model, 
			Member member, // request에서 온 값
			@SessionAttribute(name = "loginMember", required = false) Member loginMember // 세션 값
	) {
		Map<String, Object> map = new HashMap<>();
		log.info("update 요청, updateMember : " + member);
		log.info("update 요청, loginMember : " + loginMember);
		if (loginMember == null) {
			map.put("result", false);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}

//		member.setMno(loginMember.getMno());
//		member.setPassword(loginMember.getPassword());
//		Member result = service.save(member);
		Member result = service.update(member);
		if (result != null) {
			map.put("result", true);
			map.put("member", result);
			model.addAttribute("loginMember", result);
		} else {
			map.put("result", false);
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@PostMapping("/updatePwd")
	public ResponseEntity<Map<String, Object>> updatePwd(Model model,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
			@RequestBody Map<String, String> paramMap) {
		Map<String, Object> map = new HashMap<>();
		Member result = service.updatePwd(loginMember, paramMap.get("userPwd"));
		if (result != null) {
			map.put("result", true);
		} else {
			map.put("result", false);
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@GetMapping("/delete")
	public ResponseEntity<Map<String, Object>> delete(SessionStatus status,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		loginMember.setStatus("0");
		service.delete(loginMember.getMno());
		status.setComplete();
		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
}

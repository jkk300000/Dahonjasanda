package com.multi.dahon.board.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multi.dahon.board.model.service.BoardService;
import com.multi.dahon.board.model.vo.Board;
import com.multi.dahon.board.model.vo.BoardAttachFile;
import com.multi.dahon.board.model.vo.BoardCategory;
import com.multi.dahon.board.model.vo.BoardParam;
import com.multi.dahon.board.model.vo.BoardReply;
import com.multi.dahon.common.util.PageInfo;
import com.multi.dahon.member.model.vo.Member;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/boardRest")
@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
@Tag(name = "Board Rest API", description = "Board에 대한 정보를 제공합니다.")
public class BoardRestController {

	final static private String savePath = "c:\\bbs\\";

	@Autowired
	private BoardService service;
	
	
	// 카테고리를 공용적으로 사용할때 사용할 Map, List 멤버변수
	// -> 혹시모를 병행처리를 위해 Threadsafe한 클래스로 정리
	private static Vector<BoardCategory> categoryList;
	private static ConcurrentHashMap<String, String> typeMap; 

	
	// Controller가 실행될때 한번만 초기화하는 메소드
	@PostConstruct	
	public void init() {
		categoryList = service.getBoardCategory();
		typeMap = new ConcurrentHashMap<String, String>();
		for(BoardCategory item : categoryList) {
			typeMap.put(item.getType(), item.getName());
		}
	}
	

	@GetMapping(path = "/getCategory")
	public ResponseEntity<Map<String, Object>> category() {
		Map<String, Object> map = new HashMap<>();
		map.put("categoryList", categoryList);
		map.put("typeMap", typeMap);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
	
	@GetMapping(path = "/list")
	public ResponseEntity<Map<String, Object>> list(		
			@RequestParam(required = false) String searchType,
			@RequestParam(required = false) String searchValue,
			@RequestParam(required = false) String[] types,
			@RequestParam(required = false) int page) {
		BoardParam param = new BoardParam();
		param.setSearchType(searchType);
		param.setSearchValue(searchValue);
		param.setPage(page);
		param.setTypes(types);
		log.debug("@@ board list 요청 param : " + param);
		
		int boardCount = service.getBoardCount(param);
		PageInfo pageInfo = new PageInfo(param.getPage(), 10, boardCount, 12); // page가 보여질 갯수 : 10, 게시글 목록은 12개
		System.out.println("boardCount : " + boardCount);
		System.out.println("setLimit : " + boardCount);
		System.out.println("setOffset : " + (pageInfo.getStartList() - 1));
		param.setLimit(pageInfo.getListLimit());
		param.setOffset(pageInfo.getStartList() - 1);
		List<Board> list = service.getBoardList(param);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pageInfo", pageInfo);
		map.put("list", list);
		map.put("categoryList", categoryList);
		map.put("typeMap", typeMap);
		map.put("param", param);
		map.put("typeList", param.getTypeList());
		
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@GetMapping("/view")
	@JsonIgnore
	public ResponseEntity<Map<String, Object>> view(Model model, @RequestParam("bno") int bno) {
		Board board = service.findByNo(bno);
		if (board == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		Map<String, Object> map = new HashMap<>();
		map.put("board", board);
		map.put("categoryList", categoryList);
		map.put("typeMap", typeMap);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

//	순수 JSON으로 전손 받을시의 예시
//  @PostMapping(path = "/write", produces = "application/json; charset=utf8")
//	public ResponseEntity<Map<String, Object>> writeBoard(Model model, HttpSession session,
//			@SessionAttribute(name = "loginMember", required = false) Member loginMember, 
//			@ModelAttribute Board board,
//			@RequestParam(name = "upfile", required = false) MultipartFile upfile) {
	@PostMapping("/write")
	public ResponseEntity<Map<String, Object>> writeBoard(
			@SessionAttribute(name = "loginMember", required = false) Member loginMember, 
			@ModelAttribute Board board,
			@RequestParam(name = "upfiles", required = false) List<MultipartFile> upfiles,
			@RequestParam("type") String type) {
		log.info("게시글 작성 요청@@ " + board.toString());
		log.info("게시글 작성 요청####" + upfiles);

		board.setMember(loginMember);
		BoardCategory boardCategory = new BoardCategory();
		boardCategory.setType(type);
		board.setBoardCategory(boardCategory);

		List<BoardAttachFile> attachFileList = new ArrayList<>();
		
		// 파일 저장 로직
		if(upfiles != null) {
			for(MultipartFile upfile : upfiles) {
				if(upfile.getSize() == 0) {
					continue;
				}
				String renamedFileName = service.saveFile(upfile, savePath); // 실제 파일 저장로직
				if(renamedFileName != null) {
					BoardAttachFile file = new BoardAttachFile();
					file.setBoard(board);
					file.setRenamedFilename(renamedFileName);
					file.setOriginalFilename(upfile.getOriginalFilename());
					attachFileList.add(file);
				}
			}
		}

		log.debug("board : " + board);
		board.setBoardAttachFileList(attachFileList);
		Board result = service.saveBoard(board);

		Map<String, Object> map = new HashMap<>();
		if (result != null) {
			map.put("result", true);
			map.put("board", result);
		} else {
			map.put("result", false);
		}

		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@PostMapping(path = "/reply")
	public ResponseEntity<Map<String, Object>> writeReply(Model model,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
			BoardReply reply,
			int bno) {
		Map<String, Object> map = new HashMap<>();
		if (loginMember == null) {
			map.put("result", false);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}
		reply.setMember(loginMember);
		Board board = service.findByNo(bno);
		reply.setBoard(board);
		log.info("리플 작성 요청 Reply : " + reply);

		BoardReply result = service.saveReply(reply);

		if (result != null) {
			map.put("result", true);
			map.put("board", result);
		} else {
			map.put("result", false);
		}

		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@GetMapping("/delete")
	public ResponseEntity<Map<String, Object>> deleteBoard(Model model,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember, int boardNo) throws Exception {
		System.out.println("게시글 삭제 요청 boardNo : " + boardNo);
		service.deleteBoard(boardNo, savePath);
		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@GetMapping("/replyDel")
	public ResponseEntity<Map<String, Object>> deleteReply(Model model,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember, 
			int replyNo, int boardNo) {
		log.info("리플 삭제 요청");
		service.deleteReply(replyNo);
		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@PostMapping("/update")
	public ResponseEntity<Map<String, Object>> updateBoard(Model model, HttpSession session,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember, 
			@ModelAttribute Board board,
			@RequestParam(name = "upfiles", required = false) List<MultipartFile> upfiles,
			@RequestParam("type")  String type) {
		log.info("## 게시글 수정 요청 : type " + type);
		log.info("@@ 게시글 수정 요청 : board " + board);
		
		board.setMember(loginMember);
		Board prevBoard = service.findByNo(board.getBno());
		
		List<BoardAttachFile> attachFileList = new ArrayList<>();
		// 파일 저장 로직
		if(upfiles != null) {
			for(MultipartFile upfile : upfiles) {
				if(upfile.getSize() == 0) {
					continue;
				}
				String renamedFileName = service.saveFile(upfile, savePath); // 실제 파일 저장로직
				if(renamedFileName != null) {
					BoardAttachFile file = new BoardAttachFile();
					file.setBoard(board);
					file.setRenamedFilename(renamedFileName);
					file.setOriginalFilename(upfile.getOriginalFilename());
					attachFileList.add(file);
				}
			}
		}
		
		if(attachFileList.size() != 0) {
			// 기존 파일 삭제
			List<BoardAttachFile> prevAttachFileList = prevBoard.getBoardAttachFileList();
			for(BoardAttachFile file : prevAttachFileList) {
				service.deleteFile(savePath, file);
				service.deleteAttachFile(file);
			}
		}
		board.setCreateDate(prevBoard.getCreateDate());
		board.setModifyDate(new Date());
		board.setBoardAttachFileList(attachFileList);
		BoardCategory boardCategory = new BoardCategory();
		boardCategory.setType(type);
		board.setBoardCategory(boardCategory);
		log.info("board : " + board);
		Board result = service.saveBoard(board);
		
		Map<String, Object> map = new HashMap<>();

		if (result != null) {
			map.put("result", true);
			map.put("board", result);
		} else {
			map.put("result", false);
		}

		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	// 이미지 출력
	@GetMapping("/file/{fileName}")
	@ResponseBody
	public Resource downloadImage(@PathVariable("fileName") String fileName, Model model) throws IOException {
		return new UrlResource("file:" + savePath + fileName);
	}

	@GetMapping("/fileDown")
	public ResponseEntity<Resource> fileDown(
			@RequestParam("fno") int fno, 
			@RequestHeader(name = "user-agent") String userAgent) {
		try {
			BoardAttachFile file = service.findBoardAttachFile(fno);
			System.out.println(file);
			Resource resource = new UrlResource("file:" + savePath + file.getRenamedFilename() + "");
			String downName = null;

			// 인터넷 익스플로러 인 경우
			boolean isMSIE = userAgent.indexOf("MSIE") != -1 || userAgent.indexOf("Trident") != -1;

			if (isMSIE) { // 익스플로러 처리하는 방법
				downName = URLEncoder.encode(file.getOriginalFilename(), "UTF-8").replaceAll("\\+", "%20");
			} else {
				downName = new String(file.getOriginalFilename().getBytes("UTF-8"), "ISO-8859-1"); // 크롬
			}

			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + downName + "\"")
					.header(HttpHeaders.CONTENT_LENGTH, String.valueOf(resource.contentLength()))
					.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM.toString()).body(resource);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 실패했을 경우
	}

}

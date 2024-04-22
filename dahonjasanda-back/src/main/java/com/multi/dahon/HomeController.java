package com.multi.dahon;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.multi.dahon.plant.model.service.PlantService;

@Controller
public class HomeController {
	
	@GetMapping("/")
	public String home(Locale locale, Model model, @RequestParam(required = false) String command) {
		if(command != null && command.contains("init")) {
		}
		return "home";
	}
	
}

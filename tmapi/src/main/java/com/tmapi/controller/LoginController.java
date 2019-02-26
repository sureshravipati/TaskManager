package com.tmapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tmapi.service.LoginService;
import com.tmapi.to.LoginUserTO;

@RestController
@RequestMapping("/")
@CrossOrigin
public class LoginController {
	
	@Autowired
	private LoginService loginService;

	@PostMapping(path="/login")
	public LoginUserTO login(@RequestBody LoginUserTO user) throws Exception {
		System.out.println(user.getUserId());
		return loginService.Gettoken(user);		
	}
		
	@PostMapping(path="/addUser")
	public boolean addUser(@RequestBody LoginUserTO user) throws Exception {
		System.out.println(user.getUserId());
		return loginService.addUser(user);		
	}
}

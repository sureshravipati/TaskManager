package com.tmapi.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tmapi.dao.AppUserDAO;
import com.tmapi.model.AppUser;

@Service
public class AppUserDetailsService implements UserDetailsService { 
	
	@Autowired 
	private AppUserDAO userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	return mockUser(username);
    }

    private UserDetails mockUser(String username) {
    	AppUser appUser=userDao.findAllByuserId(username);
        if (null==appUser) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        User user=new User(appUser.getUserId(),appUser.getPassword(), getAuthority());
        return user;
    }

     private List<SimpleGrantedAuthority> getAuthority() {
        return Collections.emptyList();
    }
}

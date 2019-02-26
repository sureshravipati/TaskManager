package com.tmapi.service;

import com.tmapi.to.LoginUserTO;

public interface LoginService {

 public	LoginUserTO Gettoken(LoginUserTO user) throws Exception;

public boolean addUser(LoginUserTO user);

}

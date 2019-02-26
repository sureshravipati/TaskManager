package com.tmapi.dao;

import org.springframework.data.repository.CrudRepository;

import com.tmapi.model.AppUser;

public interface AppUserDAO extends CrudRepository<AppUser,Long>{

	public AppUser findAllByuserId(String username);

}

package com.tmapi.dao;

import org.springframework.data.repository.CrudRepository;

import com.tmapi.model.Task;

public interface TaskDAO extends CrudRepository<Task,Long>{

}

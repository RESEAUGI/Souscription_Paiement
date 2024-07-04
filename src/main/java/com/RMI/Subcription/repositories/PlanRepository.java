package com.RMI.Subcription.repositories;


import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.PlanModel;



public interface PlanRepository extends CassandraRepository<PlanModel,UUID>{
   PlanModel findByPlanId(UUID planId);
   List<PlanModel> findByCategory(String category);
}

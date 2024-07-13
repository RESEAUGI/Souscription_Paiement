package com.RMI.Subcription.repositories;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.PlanData;

public interface PlanDataRepository extends CassandraRepository<PlanData,UUID> {

}

package com.RMI.Subcription.repositories;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.HistoryModel;
import java.util.List;


public interface HistoryRepository extends CassandraRepository<HistoryModel,UUID> {
    List<HistoryModel> findByUserId(UUID userId);
}

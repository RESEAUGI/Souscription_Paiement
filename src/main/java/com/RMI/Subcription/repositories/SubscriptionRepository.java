package com.RMI.Subcription.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.SubscriptionsModel;
import java.time.LocalDate;


public interface SubscriptionRepository extends CassandraRepository<SubscriptionsModel,UUID>{
    SubscriptionsModel findBySubscriptionId(UUID subscriptionId);
    List<SubscriptionsModel> findByStatus(String status);
    List<SubscriptionsModel> findByPaymentDate(LocalDate paymentDate);
    List<SubscriptionsModel> findByUserId(UUID userId);
    List<SubscriptionsModel> findByPaymentMethodId(UUID paymentMethodId);
    SubscriptionsModel findByPlanId(UUID planId);
    
}
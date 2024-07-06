package com.RMI.Subcription.repositories;


import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.UserModel;
import java.util.List;
import java.util.UUID;



public interface UserRepository extends CassandraRepository<UserModel,UUID>{
    UserModel findByUserId(UUID userId);
    List<UserModel> findByStatus(String status);
    List<UserModel> findByPaymentMethodId(UUID paymentMethodId);
    List<UserModel> findBySubscriptionId(UUID subscriptionId);
    List<UserModel> findByStartDate(String startDate);
}

package com.RMI.Subcription.repositories;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.PaymentMethod;
import java.util.List;


public interface PaymentRepository extends CassandraRepository<PaymentMethod,UUID>{
    PaymentMethod findByPaymentMethodId(UUID paymentMethodId);
    List<PaymentMethod> findByMethodType(String methodType);
}

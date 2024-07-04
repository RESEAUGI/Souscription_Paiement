package com.RMI.Subcription.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.PaymentMethod;
import com.RMI.Subcription.repositories.PaymentRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    private UUID payment;

    public PaymentMethod createPayement(PaymentMethod paymentMethod) {
        setPayment(UUID.randomUUID());
        paymentMethod.setPaymentMethodId(payment);
        return paymentRepository.save(paymentMethod);
    }

    public UUID returnId(){
        return payment;
    }

    public List<PaymentMethod> getAllPayments() {
        return paymentRepository.findAll();
    }

    public PaymentMethod getByPaymentMethodId(UUID paymentMethod) {
        return paymentRepository.findByPaymentMethodId(paymentMethod);
    }

    /* 
    public List<PaymentMethod> getByUserId(UUID userId) {
        return paymentRepository.findByUserId(userId);
    }
    */

    public List<PaymentMethod> getByMethodType(String methodType) {
        return paymentRepository.findByMethodType(methodType);
    }
}

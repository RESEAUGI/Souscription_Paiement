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

    private PaymentMethod paymentMethod = new PaymentMethod();

    public PaymentMethod createPayement(
        String methodType, //card,mobile,paypal
        //card
        String cardNumber,
        String expirationDate,
        String cvc,
        //mobile
        String provider,
        String phoneNumber,
        //paypal
        String paypalEmail,
    
        UUID userId
    ) {
        paymentMethod.setCardNumber(cardNumber);
        paymentMethod.setExpirationDate(expirationDate);
        paymentMethod.setMethodType(methodType);
        paymentMethod.setPhoneNumber(phoneNumber);
        paymentMethod.setPaypalEmail(paypalEmail);
        paymentMethod.setCvc(cvc);
        paymentMethod.setProvider(provider);
        paymentMethod.setPaymentMethodId(UUID.randomUUID());
        paymentMethod.setUserId(userId);
        return paymentRepository.save(paymentMethod);
    }


    

    public List<PaymentMethod> getAllPayments() {
        return paymentRepository.findAll();
    }

    public PaymentMethod getByPaymentMethodId(UUID paymentMethod) {
        return paymentRepository.findByPaymentMethodId(paymentMethod);
    }

    public UUID returnId(){
        return paymentMethod.getPaymentMethodId();
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

package com.RMI.Subcription.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.UserModel;
import com.RMI.Subcription.repositories.UserRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class UserService { 
    private UserModel model=new UserModel();

    @Autowired
    private UserRepository userRepository;

    public UserModel NewDriver(
        UUID userId,
     
        UUID planId,
     
        String startDate,
     
        String endDate,
        
        String status,
     
        UUID paymentMethodId
    ) {
        model.setUserId(userId);
        model.setStatus(status);
        model.setPaymentMethodId(paymentMethodId);
        model.setEndDate(endDate);
        model.setStartDate(startDate);
        model.setPlanId(planId);
        model.setSubscriptionId(UUID.randomUUID());
        return userRepository.save(model);
    }


    public UUID returnId(){
        return model.getSubscriptionId();
    }

    public UserModel getUsersByID(UUID id) {
        return userRepository.findByUserId(id);
    }

    public List<UserModel> getUsersByStatus(String status) {
        return userRepository.findByStatus(status);
    }

    public List<UserModel> getUsersByPaymentMethodId(UUID paymentMethodId) {
        return userRepository.findByPaymentMethodId(paymentMethodId);
    }

    public List<UserModel> getUsersByDate(String paymentDate) {
        return userRepository.findByStartDate(paymentDate);
    }

    public List<UserModel> getUsersBySubscriptionId(UUID subscriptionId) {
        return userRepository.findBySubscriptionId(subscriptionId);
    }

    public List<UserModel> getAllUsers(){
        return userRepository.findAll();
    }


    public UserModel updateUser(UUID user,String status){
        UserModel updated = getUsersByID(user);

        if (updated!=null) {
            updated.setUserId(user);;
            updated.setStatus(status);
            return userRepository.save(updated);
        } else {
            return null;
        }
        
    }
}

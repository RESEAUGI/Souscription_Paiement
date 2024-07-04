package com.RMI.Subcription.service;


import java.time.LocalDate;
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
    @Autowired
    private UserRepository userRepository;

    private UUID userId;
    public UserModel NewDriver(UserModel model) {
        setUserId(UUID.randomUUID());
        model.setUserId(userId);
        return userRepository.save(model);
    }

    public UUID returnId(){
        return userId;
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

    public List<UserModel> getUsersByDate(LocalDate paymentDate) {
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

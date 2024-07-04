package com.RMI.Subcription.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.RMI.Subcription.models.SubscriptionsModel;
import com.RMI.Subcription.repositories.SubscriptionRepository;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public SubscriptionsModel createSubscription(SubscriptionsModel model){
        model.setSubscriptionId(UUID.randomUUID());
        return subscriptionRepository.save(model);
    }
    
    public List<SubscriptionsModel> getSubscriptions(){
        return subscriptionRepository.findAll();
    }

    public SubscriptionsModel getBySubscriptionID(UUID subscriptionID){
        return subscriptionRepository.findBySubscriptionId(subscriptionID);
    }

    public SubscriptionsModel getSubscriptionByPlan(UUID plan){

        return subscriptionRepository.findByPlanId(plan);
    }

    public List<SubscriptionsModel> getSubscriptionByStatus(String status){

        return subscriptionRepository.findByStatus(status);
    }

    public List<SubscriptionsModel> getSubscriptionByPaymentDate(LocalDate paymentDate){

        return subscriptionRepository.findByPaymentDate(paymentDate);
    }

    public List<SubscriptionsModel> getSubscriptionByUserId(UUID user){

        return subscriptionRepository.findByUserId(user);
    }

    public List<SubscriptionsModel> getSubscriptionsByPaymentMethod(UUID paymentMethod){
        return subscriptionRepository.findByPaymentMethodId(paymentMethod);
    }

    public SubscriptionsModel updateSubscription(UUID subscription,String status){
        SubscriptionsModel updated=getBySubscriptionID(subscription);

        if (updated!=null) {
            updated.setSubscriptionId(subscription);
            updated.setStatus(status);
            return subscriptionRepository.save(updated);
        } else {
            return null;
        }
        
    }

}

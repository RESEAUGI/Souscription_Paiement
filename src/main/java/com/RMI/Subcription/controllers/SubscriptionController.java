package com.RMI.Subcription.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.RMI.Subcription.models.SubscriptionsModel;
import com.RMI.Subcription.service.SubscriptionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {
    @Autowired
    public SubscriptionService subscriptionService;

    @PostMapping("/create")
    public SubscriptionsModel createSubscriptions(@RequestBody SubscriptionsModel subscriptionsModel){
        subscriptionsModel.setSubscriptionId(UUID.randomUUID());
        
        return subscriptionService.createSubscription(subscriptionsModel);
    }

    @GetMapping("/")
    public List<SubscriptionsModel> getSubscriptions() {
        return subscriptionService.getSubscriptions();
    }

    @GetMapping("/id")
    public SubscriptionsModel getSubscriptionById(@RequestParam UUID id) {
        return subscriptionService.getBySubscriptionID(id);
    }

    @GetMapping("/plan")
    public SubscriptionsModel getSubscriptionByPlan(@RequestParam UUID plan) {
        return subscriptionService.getSubscriptionByPlan(plan);
    }
    
    @GetMapping("/status")
    public List<SubscriptionsModel> getSubscriptionByStatus(@RequestParam String status){
        return subscriptionService.getSubscriptionByStatus(status);
    }

    @GetMapping("/method")
    public List<SubscriptionsModel> getSubscriptionByPaymentID(@RequestParam UUID method){
        return subscriptionService.getSubscriptionsByPaymentMethod(method);
    }
    
    @GetMapping("/user")
    public List<SubscriptionsModel> getSubscriptionByUser(@RequestParam UUID user){
        return subscriptionService.getSubscriptionByUserId(user);
    }

    @GetMapping("/date")
    public List<SubscriptionsModel> getSubscriptionsByDate(@RequestParam LocalDate date){
        return subscriptionService.getSubscriptionByPaymentDate(date);
    }

    @PutMapping("update_status/{id}")
    public  SubscriptionsModel UpdateStatus(@PathVariable UUID id, @RequestParam String status) {
        return subscriptionService.updateSubscription(id, status);
    }
    
    
}

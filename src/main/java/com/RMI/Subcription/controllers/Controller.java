package com.RMI.Subcription.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.RMI.Subcription.models.PaymentMethod;
import com.RMI.Subcription.models.PlanModel;
import com.RMI.Subcription.models.SubscriptionsModel;
import com.RMI.Subcription.models.UserModel;
import com.RMI.Subcription.service.PaymentService;
import com.RMI.Subcription.service.PlanService;
import com.RMI.Subcription.service.SubscriptionService;
import com.RMI.Subcription.service.UserService;

import lombok.Getter;
import lombok.Setter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Getter
@Setter
@RestController
@RequestMapping("/")
public class Controller {

    private Map<String,UUID> map = new HashMap<>();

    @Autowired
    public PaymentService paymentService;

    @Autowired
    public UserService userService;

    @Autowired
    public PlanService planService;

    @Autowired
    public SubscriptionService subscriptionService;

    //##############Plans ##########################
        @PostMapping("plans/create")
        public Map<String,UUID> createPlan(@RequestBody PlanModel planModel, @RequestParam boolean actived) {
            map.clear();
            if (actived==false) {
                planService.saveTemp(planModel.getCategory(), planModel.getAmount(), planModel.getDuration());
                map.put("Temporaly saved",null);
                return map;
            } else {
                planService.createPlan();
                map.remove("Temporaly saved");
                map.put("saved in database",planService.createPlan().getPlanId());
                return map;
            }
        }

        @GetMapping("plans")
        public List <PlanModel> getAllPlans() {
            return planService.getAllPlan();
        }

        @GetMapping("plans/id")
        public PlanModel getById(@RequestParam UUID id) {
            return planService.getPlanById(id);
        }

        @GetMapping("plans/category")
        public List <PlanModel>  getByCategory(@RequestParam String category) {
            return planService.getByCategory(category);
        }
    
    //###############PaymentMethod##############################################
        @PostMapping("payment/create")
        public Map<String,UUID> createPayment(@RequestBody PaymentMethod paymentMethod, @RequestParam boolean actived) throws Exception{
            map.clear();
            if (actived==false) {
                paymentService.saveTemp(paymentMethod.getMethodType(),paymentMethod.getCardNumber(), paymentMethod.getExpirationDate(), paymentMethod.getCvc(), paymentMethod.getProvider(), paymentMethod.getPhoneNumber(), paymentMethod.getPaypalEmail(),paymentMethod.getUserId());
                map.put("Temporaly saved",null);
                return map;
            } else {
                map.remove("Temporaly saved");
                paymentService.createPayement();
                map.put("saved in database",paymentService.createPayement().getPaymentMethodId());
                return map;    
            }
            
        }

        @GetMapping("payment")
        public List <PaymentMethod> getAll() {
            return paymentService.getAllPayments();
        }
    
        @GetMapping("payment/id")
        public PaymentMethod getMethodById(@RequestParam UUID id) {
            return paymentService.getByPaymentMethodId(id);
        }
    
        @GetMapping("payment/type")
        public List<PaymentMethod>  getMethodByType(@RequestParam String method) {
            return paymentService.getByMethodType(method);
        }
    //###############Subscription################################################
        @PostMapping("subscription/create")
        public Map<String,UUID> createDriver(@RequestBody UserModel userModel, @RequestParam boolean actived) {
            map.clear();

            if (actived==false) {
                
                userService.saveTemp(userModel.getUserId(), planService.returnId(), userModel.getStartDate(), userModel.getEndDate(), userModel.getStatus(), paymentService.returnId());
                map.put("Temporaly saved", null);
                return map;
            } else {
                map.remove("Temporaly saved");
                userService.NewDriver();
                map.put("Saved in database", userService.NewDriver().getPaymentMethodId());
                return map;
            }
        }

        @GetMapping("subscription/id")
        public UserModel getByID (@RequestParam UUID id) {
            return userService.getUsersByID(id);
        }

        @GetMapping("subscription/status")
        public List<UserModel>  getBySatus(@RequestParam String status) {
            return userService.getUsersByStatus(status);
        }

        @GetMapping("subscription/method")
        public List<UserModel>  getByMethod(@RequestParam UUID method) {
            return userService.getUsersByPaymentMethodId(method);
        }

        @GetMapping("subscription/date")
        public List<UserModel> getByDate(@RequestParam String date) {
            return userService.getUsersByDate(date);
        }

        @GetMapping("subscription/subscription")
        public List<UserModel> getBySuscription(@RequestParam UUID subscription) {
            return userService.getUsersBySubscriptionId(subscription);
        }

        @PutMapping("subscription/update/{id}")
        public UserModel updateStatus(@PathVariable UUID id, @RequestParam String status) {
            return userService.updateUser(id, status);
        }
        
        @GetMapping("subscription")
        public List<UserModel>  getAllSub() {
            return userService.getAllUsers();
        }

    //###############History######################################################
    @PostMapping("history/create")
    public SubscriptionsModel createSubscriptions(@RequestBody SubscriptionsModel subscriptionsModel){
        return subscriptionService.createSubscription(subscriptionsModel.getUserId(), subscriptionsModel.getSubscriptionId(),
         subscriptionsModel.getPaymentDate(), subscriptionsModel.getPlanId(), subscriptionsModel.getStatus(),subscriptionsModel.getPaymentMethodId());
    }

    @GetMapping("history/")
    public List<SubscriptionsModel> getSubscriptions() {
        return subscriptionService.getSubscriptions();
    }

    @GetMapping("history/id")
    public SubscriptionsModel getSubscriptionById(@RequestParam UUID id) {
        return subscriptionService.getBySubscriptionID(id);
    }

    @GetMapping("history/plan")
    public SubscriptionsModel getSubscriptionByPlan(@RequestParam UUID plan) {
        return subscriptionService.getSubscriptionByPlan(plan);
    }
    
    @GetMapping("history/status")
    public List<SubscriptionsModel> getSubscriptionByStatus(@RequestParam String status){
        return subscriptionService.getSubscriptionByStatus(status);
    }

    @GetMapping("history/method")
    public List<SubscriptionsModel> getSubscriptionByPaymentID(@RequestParam UUID method){
        return subscriptionService.getSubscriptionsByPaymentMethod(method);
    }
    
    @GetMapping("history/user")
    public List<SubscriptionsModel> getSubscriptionByUser(@RequestParam UUID user){
        return subscriptionService.getSubscriptionByUserId(user);
    }

    @GetMapping("history/date")
    public List<SubscriptionsModel> getSubscriptionsByDate(@RequestParam String date){
        return subscriptionService.getSubscriptionByPaymentDate(date);
    }

    @PutMapping("historyupdate_status/{id}")
    public  SubscriptionsModel UpdateStatus(@PathVariable UUID id, @RequestParam String status) {
        return subscriptionService.updateSubscription(id, status);
    }
}

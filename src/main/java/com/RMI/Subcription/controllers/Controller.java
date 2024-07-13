package com.RMI.Subcription.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.RMI.Subcription.models.HistoryModel;
import com.RMI.Subcription.models.PaymentMethod;
import com.RMI.Subcription.models.PlanData;
import com.RMI.Subcription.models.PlanModel;
import com.RMI.Subcription.models.Promo_code;
import com.RMI.Subcription.models.SubscriptionsModel;
import com.RMI.Subcription.models.Supermodel;
import com.RMI.Subcription.models.UserModel;
import com.RMI.Subcription.service.HistoryService;
import com.RMI.Subcription.service.PaymentService;
import com.RMI.Subcription.service.PlanDataService;
import com.RMI.Subcription.service.PlanService;
import com.RMI.Subcription.service.Promo_codeService;
import com.RMI.Subcription.service.SubscriptionService;
import com.RMI.Subcription.service.UserService;

import lombok.Getter;
import lombok.Setter;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Getter
@Setter
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
    
    private Map<String,UUID> map = new HashMap<>();

    @Autowired
    public Promo_codeService promo;

    @Autowired
    public PaymentService paymentService;

    @Autowired
    public UserService userService;

    @Autowired
    public PlanService planService;

    @Autowired
    public SubscriptionService subscriptionService;

    @Autowired
    public HistoryService historiesService;

    @Autowired
    public PlanDataService planDataService;

    

    @PostMapping("subscription/create")
        public Map<String,UUID> createDriver(@RequestBody Supermodel model) {
            map.clear();
            // plan
            planService.createPlan(model.getCategory(), model.getAmount(), model.getDuration());

            // mode de paiement
            paymentService.createPayement(model.getMethodType(), model.getCardNumber(), model.getExpirationDate(),
                    model.getCvc(), model.getProvider(), model.getPhoneNumber(), model.getPaypalEmail(), model.getUserId());

            // Souscription
            userService.NewDriver(model.getUserId(), planService.returnId(), model.getStartDate(), model.getEndDate(),
                    model.getStatus(), paymentService.returnId());

            // Full history
            historiesService.setData(model.getUserId(), model.getAmount(), model.getCategory(), model.getEndDate(),
                    model.getMethodType(), paymentService.returnId(), model.getStatus(), model.getStartDate());
            historiesService.saveHistory();
            // Historique
            subscriptionService.createSubscription(model.getUserId(), userService.returnId(),
                    model.getPaymentDate(), planService.returnId(), model.getStatus(), paymentService.returnId());
            map.put("Saved in database", userService.returnId());
            return map;
            
        }
            
        @PostMapping("/save_promo")
        public List<Promo_code> savePromo(@RequestBody List<Promo_code> list) {
            return promo.savePromocode(list);
        }

        @GetMapping("/get_promo")
        public List<Promo_code> getPromo() {
            return promo.findAll();
        }
        
        @PostMapping("/delete_promo")
        public String delete(@RequestBody Promo_code entity) {
            return promo.deletePromo(entity);
        } 
        
        @PostMapping("/save_plan")
        public String savePlan(@RequestBody PlanData entity) {
            planDataService.savePlanData(entity);
            return "Saved successfully";
        }

        @PostMapping("/delete_plan")
        public String deletePlan(@RequestBody PlanData entity) {
            planDataService.deletePlanData(entity);
            return "Deleted successfully";
        }

        @GetMapping("/find_plan")
        public List<PlanData> finDatas() {
            return planDataService.findAllPlanData();
        }

        
        
        
        
        
            //##############Plans ##########################
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
    @GetMapping("/history")
    public List<SubscriptionsModel> getSubscriptions() {
        return subscriptionService.getSubscriptions();
    }

    @GetMapping("/histories")
    public List<HistoryModel> getHistory() {
        return historiesService.getHistory(historiesService.returnUserId());
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

package com.RMI.Subcription.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.RMI.Subcription.models.PaymentMethod;
import com.RMI.Subcription.service.PaymentService;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@Getter
@Setter
@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    public PaymentService paymentService;
    private Map<String, String> success=new HashMap<>();

    @PostMapping("/create")
    public String createPayment(@RequestBody PaymentMethod paymentMethod) throws Exception{
        
        try {
            paymentService.createPayement(paymentMethod);
            success.put("success", paymentService.returnId().toString());
            return success.get("success");
        } catch (Exception e) {
            success.put("error", e.getMessage());
            return success.get("error");
        }
        
    }
    
    @GetMapping("/")
    public List <PaymentMethod> getAll() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/id")
    public PaymentMethod getMethodById(@RequestParam UUID id) {
        return paymentService.getByPaymentMethodId(id);
    }

    @GetMapping("/type")
    public List<PaymentMethod>  getMethodByType(@RequestParam String method) {
        return paymentService.getByMethodType(method);
    }
    
    
    

}

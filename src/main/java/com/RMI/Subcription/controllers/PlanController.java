package com.RMI.Subcription.controllers;


import com.RMI.Subcription.models.PlanModel;
import com.RMI.Subcription.service.PlanService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/plans")
public class PlanController {
    @Autowired
    public PlanService planService;
    private Map<String, String> success=new HashMap<>();

    @PostMapping("/create_plan")
    public String createPlan(@RequestBody PlanModel planModel) {
                
        try {
            planService.createPlan(planModel);
            success.put("success", planService.ReturnId().toString());
            return success.get("success");
        } catch (Exception e) {
            success.put("error", e.getMessage());
            return success.get("error");
        }
    }

    @GetMapping("/")
    public List <PlanModel> getAllPlans() {
        return planService.getAllPlan();
    }

    @GetMapping("/id")
    public PlanModel getById(@RequestParam UUID id) {
        return planService.getPlanById(id);
    }

    @GetMapping("/category")
    public List <PlanModel>  getByCategory(@RequestParam String category) {
        return planService.getByCategory(category);
    }
    
    
    
}

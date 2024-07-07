package com.RMI.Subcription.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.PlanModel;
import com.RMI.Subcription.repositories.PlanRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class PlanService {
    @Autowired
    private PlanRepository planRepository;

    private PlanModel model= new PlanModel();
    
    public PlanModel createPlan(String category, BigDecimal amount, Integer duration) {
        model.setPlanId(UUID.randomUUID());
        model.setAmount(amount);
        model.setDuration(duration);
        model.setCategory(category);
        return planRepository.save(model);
    };

    public UUID returnId(){
        return model.getPlanId();
    }

    public List <PlanModel> getAllPlan() {
        return planRepository.findAll();
    }

    public PlanModel getPlanById(UUID id) {
        return planRepository.findByPlanId(id);
    }

    public List <PlanModel> getByCategory(String category) {
        return planRepository.findByCategory(category);
    }
}

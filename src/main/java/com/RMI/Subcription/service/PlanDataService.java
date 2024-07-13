package com.RMI.Subcription.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.PlanData;
import com.RMI.Subcription.repositories.PlanDataRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class PlanDataService {
    @Autowired
    private PlanDataRepository planDataRepository;

    public void savePlanData(PlanData plan){
        plan.setId(UUID.randomUUID());
        planDataRepository.save(plan);
    }

    public void deletePlanData(PlanData plan){
        planDataRepository.delete(plan);
    }

    public List<PlanData> findAllPlanData(){
       return planDataRepository.findAll();
    }
}

package com.RMI.Subcription.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.HistoryModel;
import com.RMI.Subcription.repositories.HistoryRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class HistoryService {
    private HistoryModel historyModel=new HistoryModel();

    @Autowired
    public HistoryRepository historyRepository;

    public List<HistoryModel> getHistory (UUID userId){
        return historyRepository.findByUserId(userId);
    }

    public HistoryModel saveHistory(){
        return historyRepository.save(historyModel);
    }

    public UUID returnUserId() {
        return historyModel.getUserId();
    }

    public void setData(UUID userId,BigDecimal amount,String category,
    String endDate,String method, UUID paymentId,String status,
    String startDate
    ){
        historyModel.setUserId(userId);
        historyModel.setAmount(amount);
        historyModel.setCategory(category);
        historyModel.setEndDate(endDate);
        historyModel.setMethodType(method);
        historyModel.setPaymentId(paymentId);
        historyModel.setStatus(status);
        historyModel.setStartDate(startDate);
    }
}

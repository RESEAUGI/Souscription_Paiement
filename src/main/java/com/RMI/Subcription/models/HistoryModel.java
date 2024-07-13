package com.RMI.Subcription.models;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Table("history")
public class HistoryModel {
    private UUID userId;
    private String startDate;
    private String endDate;
    private String Status;
    private String methodType;
    @PrimaryKey
    @Id
    private UUID paymentId;
    private String category;
    private BigDecimal amount;
}

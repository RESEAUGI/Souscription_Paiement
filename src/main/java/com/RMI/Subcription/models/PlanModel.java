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
@Table("subscription_plans")
public class PlanModel {
    @PrimaryKey
    @Id
    private UUID planId;

    private String category;//Standard,basic,premium

    private BigDecimal amount;//prix

    private Integer duration;//durée du plan 3,6,12 mois
}

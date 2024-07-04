package com.RMI.Subcription.models;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table("payment_history")
public class SubscriptionsModel {
    
    private UUID userId;

    @PrimaryKey
    @Id
    private UUID subscriptionId;

    private LocalDate paymentDate;

    private UUID planId;

    private String status;

    private UUID paymentMethodId;
}

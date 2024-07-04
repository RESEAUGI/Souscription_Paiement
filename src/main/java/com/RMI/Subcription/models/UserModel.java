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
@Table("user_subscriptions")
public class UserModel {
   
   @PrimaryKey
   @Id
   private UUID subscriptionId;

   private UUID userId;

   private UUID planId;

   private LocalDate startDate;

   private LocalDate endDate;
   
   private String status;

   private UUID paymentMethodId;
}

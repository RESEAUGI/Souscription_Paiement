package com.RMI.Subcription.models;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Supermodel {
   private UUID userId;

   private String startDate;

   private String endDate;
   
   private String status;

   private String paymentDate;

    private String category;//Standard,basic,premium

    private BigDecimal amount;//prix

    private Integer duration;//durée du plan 3,6,12 mois

    private String methodType; //card,mobile,paypal

    //card
    private String cardNumber;

    private String expirationDate;

    private String cvc; 

    //mobile
    private String provider;
    
    private String phoneNumber;
    
    //paypal
    private String paypalEmail;

}

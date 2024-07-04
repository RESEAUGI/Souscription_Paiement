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
@Table("user_payment_methods")
public class PaymentMethod {
    private UUID userId;

    @PrimaryKey
    @Id
    private UUID paymentMethodId;

    private String methodType; //card,mobile,paypal

    //card
    private String cardNumber;

    private LocalDate expirationDate;

    private String cvc; 

    //mobile
    private String provider;
    private String phoneNumber;
    //paypal
    private String paypalEmail;
}

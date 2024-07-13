package com.RMI.Subcription.models;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionData {

    private UUID id;
    private BigDecimal amount;
    private String currency;
    private String description;
    private String motif;
}

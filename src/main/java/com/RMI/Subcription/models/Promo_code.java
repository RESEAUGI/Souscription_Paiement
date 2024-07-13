package com.RMI.Subcription.models;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table("promo_code")
public class Promo_code {
    @PrimaryKey
    private String code;

    private Integer validity;
    
    private Integer discount;

    private String status;

    private String startDate;
}

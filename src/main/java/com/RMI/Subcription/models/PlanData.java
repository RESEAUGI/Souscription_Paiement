package com.RMI.Subcription.models;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table("plandata")
public class PlanData {
    @PrimaryKey
    private UUID id;

    private String type;

    private String title;

    private List<String> description;

    private String content;

    private BigDecimal amount;

}

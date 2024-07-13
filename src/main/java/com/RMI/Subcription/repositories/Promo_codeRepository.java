package com.RMI.Subcription.repositories;


import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.Promo_code;

public interface Promo_codeRepository extends CassandraRepository<Promo_code,String>  {
    
}

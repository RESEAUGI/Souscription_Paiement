package com.RMI.Subcription;

import java.net.InetSocketAddress;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.datastax.oss.driver.api.core.CqlSession;

@Configuration
public class CassandraConfig {
    @Bean
    public CqlSession cqlSession(){
        return CqlSession.builder()
        .withKeyspace("subscription_service")
        .withAuthCredentials("cassandra", "cassandra")
        .withLocalDatacenter("datacenter1")
        .addContactPoint(new InetSocketAddress("127.0.0.1",9042))
        .build();
    }
}

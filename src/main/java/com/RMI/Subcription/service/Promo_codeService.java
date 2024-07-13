package com.RMI.Subcription.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.Promo_code;
import com.RMI.Subcription.repositories.Promo_codeRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class Promo_codeService {
    @Autowired
    private Promo_codeRepository promo;

    public List<Promo_code> savePromocode(List<Promo_code> list){
        return promo.saveAll(list);
    }

    public List<Promo_code>  findAll(){
        return promo.findAll();
    }

    public String deletePromo(Promo_code code){
        promo.delete(code);
        return "deleted successfully";
    }
}

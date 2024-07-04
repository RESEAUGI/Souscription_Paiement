package com.RMI.Subcription.controllers;


import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RMI.Subcription.models.UserModel;
import com.RMI.Subcription.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
@RequestMapping("/drivers")
public class UserController {
    @Autowired
    public UserService usersService;

    @PostMapping("/create")
    public UserModel createDriver(@RequestBody UserModel userModel) {
        userModel.setUserId(UUID.randomUUID());
        return usersService.NewDriver(userModel);
    }

    @GetMapping("/id")
    public UserModel getByID (@RequestParam UUID id) {
        return usersService.getUsersByID(id);
    }

    @GetMapping("/status")
    public List<UserModel>  getBySatus(@RequestParam String status) {
        return usersService.getUsersByStatus(status);
    }

    @GetMapping("/method")
    public List<UserModel>  getByMethod(@RequestParam UUID method) {
        return usersService.getUsersByPaymentMethodId(method);
    }

    @GetMapping("/date")
    public List<UserModel> getByDate(@RequestParam LocalDate date) {
        return usersService.getUsersByDate(date);
    }

    @GetMapping("/subscription")
    public List<UserModel> getBySuscription(@RequestParam UUID subscription) {
        return usersService.getUsersBySubscriptionId(subscription);
    }

    @PutMapping("/update/{id}")
    public UserModel updateStatus(@PathVariable UUID id, @RequestParam String status) {
        return usersService.updateUser(id, status);
    }
    
    
    
    @GetMapping("/")
    public List<UserModel>  getAll() {
        return usersService.getAllUsers();
    }
    
    
    
    
}

package com.experiment9;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SecureScalableApp {
    public static void main(String[] args) {
        SpringApplication.run(SecureScalableApp.class, args);
    }
}

package com.cts.croplisting_service;

import com.cts.croplisting_service.service.JwtService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class CroplistingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CroplistingServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner generateTestToken(JwtService jwtService) {
		return args -> {
			// Generate a token for a test user with the username "testFarmer"
			String token = jwtService.generateToken("testFarmer");
			System.out.println("-----------------------------------------");
			System.out.println("TESTING JWT TOKEN: Bearer " + token);
			System.out.println("-----------------------------------------");
		};
	}
}

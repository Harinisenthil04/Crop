package com.cts.Registry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer // This is mandatory
public class RegistryApplication {
	public static void main(String[] args) {
		SpringApplication.run( RegistryApplication.class, args);
		System.out.println("Eureka server is running");
	}
}
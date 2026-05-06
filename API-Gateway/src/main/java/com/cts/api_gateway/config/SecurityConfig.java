package com.cts.api_gateway.config;

import com.cts.api_gateway.filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http, JwtFilter jwtFilter) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchanges -> exchanges
                        // Public Endpoints
                        .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .pathMatchers("/users/login", "/users/register", "/actuator/**").permitAll()
                        .pathMatchers("/market/test-proxy").permitAll()

                        // Role-based Endpoints
                        .pathMatchers("/api/report/**").hasRole("ADMIN")
                        .pathMatchers(HttpMethod.GET, "/api/notification/**").hasAnyRole("ADMIN", "FARMER", "TRADER", "OFFICER", "AUDITOR", "MANAGER", "COMPLIANCE")
                        .pathMatchers(HttpMethod.POST, "/api/notification/**").hasAnyRole("ADMIN", "OFFICER")
                        .pathMatchers(HttpMethod.DELETE,  "/api/notification/**").hasRole("ADMIN")
                        .pathMatchers(HttpMethod.PUT,   "/api/notification/update-status/**").hasAnyRole("FARMER", "TRADER")

                        .pathMatchers("/api/transactions/**").hasAnyRole("TRADER", "FARMER", "ADMIN")

                        // 2. Crop Listing Permissions (Migrated from old config)
                        .pathMatchers(HttpMethod.POST, "/market/createlisting").hasRole("FARMER")
                        .pathMatchers(HttpMethod.PUT, "/market/listings/validate/**").hasRole("OFFICER")
                        // GET for listings - Accessible by all roles
                        .pathMatchers(HttpMethod.GET, "/market/listings/**").hasAnyRole("FARMER", "TRADER", "OFFICER", "ADMIN")

                        // 3. Order Permissions (Migrated from old config)
                        .pathMatchers(HttpMethod.POST, "/market/placeorder").hasRole("TRADER")
                        .pathMatchers("/market/orders/**").hasAnyRole("TRADER", "OFFICER", "ADMIN")
                        // Farmer Management
                        .pathMatchers("/farmers/**").hasAnyRole("ADMIN", "OFFICER")

                        // --- Subsidy Program ---
                        // Only MANAGER can create, update, delete subsidy programs
                        .pathMatchers(HttpMethod.POST, "/subsidy-programs/**").hasRole("MANAGER")
                        .pathMatchers(HttpMethod.PUT, "/subsidy-programs/**").hasRole("MANAGER")
                        .pathMatchers(HttpMethod.DELETE, "/subsidy-programs/**").hasRole("MANAGER")
                        // Any logged-in user can view subsidy programs (farmer needs to see them to apply)
                        .pathMatchers(HttpMethod.GET, "/subsidy-programs/**").authenticated()

                        // --- Disbursement ---
                        // Only FARMER can apply (POST)
                        .pathMatchers(HttpMethod.POST, "/disbursements/**").hasRole("FARMER")
                        // Only OFFICER can approve or reject (PATCH /disbursements/{id}/review)
                        .pathMatchers(HttpMethod.PATCH, "/disbursements/*/review").hasRole("OFFICER")
                        // OFFICER and MANAGER can view all disbursements
                        .pathMatchers(HttpMethod.GET, "/disbursements/**").hasAnyRole("OFFICER", "MANAGER", "FARMER")

                        .pathMatchers("/transactions/**").hasAnyRole("TRADER", "FARMER", "ADMIN")
                        .pathMatchers("/payments/**").hasAnyRole("TRADER", "ADMIN")

                        // --- 2. Audit & Compliance (Newly Added) ---
                        .pathMatchers("/api/audits/**").hasAnyRole("AUDITOR", "ADMIN")
                        .pathMatchers("/api/compliances/**").hasAnyRole("COMPLIANCE", "ADMIN")

                        // AuditLog: Any authenticated user can POST (log), only ADMIN & AUDITOR can GET (view)
                        .pathMatchers(HttpMethod.POST, "/api/auditlogs/**").authenticated()
                        .pathMatchers(HttpMethod.GET, "/api/auditlogs/**").hasAnyRole("ADMIN", "AUDITOR")

                        .anyExchange().authenticated()
                )
                // Add your custom filter
                .addFilterAt(jwtFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        corsConfig.setMaxAge(3600L);
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}
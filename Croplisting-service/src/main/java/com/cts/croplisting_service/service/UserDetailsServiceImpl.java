package com.cts.croplisting_service.service;

import com.cts.croplisting_service.enums.UserRole;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // For testing, we are hardcoding the FARMER role.
        // We MUST add "ROLE_" prefix so hasRole("FARMER") works.
        String roleWithPrefix = "ROLE_" + UserRole.FARMER.name();

        return User.builder()
                .username(username)
                .password("") // Password not needed for JWT
                .authorities(Collections.singleton(new SimpleGrantedAuthority(roleWithPrefix)))
                .build();
    }
}
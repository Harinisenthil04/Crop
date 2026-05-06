package com.cts.croplisting_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {

    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Password is mandatory")
    private String password;
}
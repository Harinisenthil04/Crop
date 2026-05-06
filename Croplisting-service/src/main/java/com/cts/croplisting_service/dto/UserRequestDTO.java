package com.cts.croplisting_service.dto;

import com.cts.croplisting_service.enums.UserRole;
import com.cts.croplisting_service.enums.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String name;
    private UserRole role;

    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;

    @NotNull(message = "Status is mandatory")
    private UserStatus status;

    @NotNull(message = "Password is mandatory")
    private String password;
}

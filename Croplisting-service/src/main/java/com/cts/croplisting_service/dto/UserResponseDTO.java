package com.cts.croplisting_service.dto;

import com.cts.croplisting_service.enums.UserRole;
import com.cts.croplisting_service.enums.UserStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private UserRole role;
    private UserStatus status;
}

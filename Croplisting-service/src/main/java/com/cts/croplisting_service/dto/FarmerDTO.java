package com.cts.croplisting_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FarmerDTO {

    private Long farmerId;
    private String name;
    private LocalDate dob;
    private String gender;
    private String address;
    private String contactInfo;
    private String landDetails;
    private String status;

}
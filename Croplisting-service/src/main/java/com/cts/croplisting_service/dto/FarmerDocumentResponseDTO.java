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
public class FarmerDocumentResponseDTO {

    private Long documentId;
    private Long farmerId;
    private String docType;
    private String fileUri;
    private LocalDate uploadedDate;
    private String verificationStatus;

 }

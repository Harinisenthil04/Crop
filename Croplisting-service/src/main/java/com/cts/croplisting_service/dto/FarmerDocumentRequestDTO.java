package com.cts.croplisting_service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FarmerDocumentRequestDTO {

    @NotNull(message = "Farmer ID is mandatory")
    private Long farmerId;

    @NotNull(message = "Document type is mandatory")
    private String docType;

    @NotNull(message = "File URI is mandatory")
    private String fileUri;

}

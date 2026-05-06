export enum ComplianceResult {
    PASSED = 'PASSED',
    FAILED = 'FAILED',
    PENDING = 'PENDING',
    REVIEW = 'REVIEW'
}

export enum ComplianceType {
    LISTING = 'LISTING',
    TRANSACTION = 'TRANSACTION',
    PROGRAM = 'PROGRAM'
}

export interface ComplianceDTO {
    complianceId?: number;
    auditId: number;
    entityId: number;
    type: ComplianceType;
    result: ComplianceResult;
    date: string;
    notes: string;
}
export enum UserRole {
  FARMER = 'FARMER',
  TRADER = 'TRADER',
  OFFICER = 'OFFICER',
  MANAGER = 'MANAGER',
  COMPLIANCE = 'COMPLIANCE',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN'
}

export enum CropListingStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
  SOLD_OUT = 'SOLD_OUT'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum NotificationStatus {
  READ = 'READ',
  UNREAD = 'UNREAD'
}
export enum NotificationCategory {
  ALERT = 'ALERT',
  VERIFICATION = 'VERIFICATION',
  BROADCAST = 'BROADCAST'
}
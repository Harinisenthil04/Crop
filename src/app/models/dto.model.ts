export interface CropListingDTO {
  listingId?: number;
  farmerId: number;
  cropType: string;
  quantity: number;
  price: number;
  location: string;
  status?: string;
  documentUrl?: string;
}

export interface OrderDTO {
  orderId?: number;
  listingId: number;
  traderId: number;
  quantity: number;
  orderDate: string;
  orderStatus?: string;
}

export interface ReportDTO {
  scope: string;
  metrics: string;
}

export interface Report {
  reportId: number;
  scope: string;
  metrics: string;
  generatedDate: string;
}

export interface NotificationDTO {
  userId?: number;
  role?: string;
  subject: string;
  message: string;
  category: string;
  status?: string;
}

export interface Notification {
  notificationID: number;
  userId?: number;
  role?: string;
  subject: string;
  message: string;
  category: string;
  status: string;
  createdDate: string;
}
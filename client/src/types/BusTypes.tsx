export interface NextBusType {
  OriginCode: string;
  EstimatedArrival: string;
  Latitude: string;
  Longitude: string;
  Type: "SD" | "DD" | "BD";
  Load: "SEA" | "SDA" | "LSD";
  Feature: "WAB" | "";
}

export interface BusServiceCardProps {
  ServiceNo: string;
  NextBus: NextBusType;
  NextBus2: NextBusType;
}

export interface Service {
  ServiceNo: string;
  NextBus: NextBusType;
  NextBus2: NextBusType;
}

export type RenderType = "SINGLE_STOP" | "ROUTE_VIEW"
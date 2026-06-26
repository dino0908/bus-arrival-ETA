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
  onViewRoute: () => void
}

export interface Service {
  ServiceNo: string;
  NextBus: NextBusType;
  NextBus2: NextBusType;
}

export interface BusStopType {
  distance?: number
  BusStopCode: string
  RoadName: string
  Description: string
  Latitude: number
  Longitude: number
}
export type RenderType = "SINGLE_STOP" | "ROUTE_VIEW"
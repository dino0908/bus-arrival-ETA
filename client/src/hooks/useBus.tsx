import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { type Service } from "../types/BusTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const fetchBusData = async (val: string) => {
    const response = await axios.get<Service[]>(`${API_BASE_URL}/api/bus/${val}`)
    return response.data
}

export const useBus = (val: string) => {
    return useQuery({
        queryKey: ["bus", val],
        queryFn: () => fetchBusData(val),
        enabled: !!val, // Only run the query if 'val' is not empty
    })
}
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchBusData = async (val: string) => {
    const data = await axios.get("https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=" + val)

    return data
}

export const useBus = (val: string) => {
    return useQuery({
        queryKey: ["bus", val],
        queryFn: () => fetchBusData(val),
        enabled: !!val, // Only run the query if 'val' is not empty
    })
}
import { fetchBusArrivalData } from '../service/ltaService.js';

export const getBusData = async (req, res) => {
    try {
        const busStopCode = req.params.id;

        if (!busStopCode) {
            return res.status(400).json({ message: "Bus stop ID is required" });
        }

        const data = await fetchBusArrivalData(busStopCode);
        res.status(200).json(data);
        
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: "Error fetching bus data" });
    }
};
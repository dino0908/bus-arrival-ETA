import { fetchBusArrivalData } from '../service/ltaService.js';
import { redisClient } from '../index.js';

export const getBusData = async (req, res) => {
    try {
        const busStopCode = req.params.id;

        if (!busStopCode) {
            return res.status(400).json({ message: "Bus stop ID is required" });
        }

        const cacheKey = `bus:stop:${busStopCode}`; // redis key
        const cachedData = await redisClient.get(cacheKey); // try to get data from redis

        if (cachedData) { // cache hit, parse json string back into obj and return
            return res.status(200).json(JSON.parse(cachedData));
        }

        const data = await fetchBusArrivalData(busStopCode); // cache miss, call api as normal

        const servicesData = data.Services;

        await redisClient.set(cacheKey, JSON.stringify(servicesData), { // save api data to redis as a JSON string w 60s expiry
            EX: 60 
        });
        
        res.status(200).json(servicesData);
        
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: "Error fetching bus data" });
    }
};
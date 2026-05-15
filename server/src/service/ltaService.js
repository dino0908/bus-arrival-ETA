import axios from 'axios';

export const fetchBusArrivalData = async (busStopCode) => {
    const response = await axios.get(
        `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
        {
            headers: {
                'AccountKey': process.env.LTA_ACCOUNT_KEY,
                'accept': 'application/json'
            }
        }
    );
    return response.data;
};
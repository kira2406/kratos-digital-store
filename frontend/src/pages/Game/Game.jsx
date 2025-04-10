import React, { useEffect, useState } from 'react'
import GameData from '../../components/Game/GameData'
import SalesChart from '../../components/SalesChart/SalesChart'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import axios from 'axios'

const Game = () => {
    const [actualSalesData, setActualSalesData] = useState([]);
    const [forecastedSalesData, setForecastedSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch sales data from your backend API
        const fetchSalesData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/publisher/getSalesData', {
                    game_id: "70c5228e-704d-43e9-b29f-0a3f8174ba72", // Pass game_id dynamically
                });
                setActualSalesData(response.data.actualSales); // Adjust based on your API response structure
                setForecastedSalesData(response.data.forecastedSales); // Adjust based on your API response structure
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch sales data', err);
                setLoading(false);
            }
        };

        fetchSalesData();
    }, []);

  return (
    <div>
        <GameData gamename={"Rocket"}/>
        <Container>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            ) : (
                <SalesChart actualSalesData={actualSalesData} forecastedSalesData={forecastedSalesData} />
            )}
        </Container>
    </div>
  )
}

export default Game
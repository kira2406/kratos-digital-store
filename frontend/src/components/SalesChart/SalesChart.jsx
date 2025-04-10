import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({actualSalesData, forecastedSalesData}) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Actual Sales',
                data: [],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    });

    useEffect(() => {
        if (actualSalesData && actualSalesData.length) {
            const dates = actualSalesData.map((item) => item.sale_date);
            const totalSold = actualSalesData.map((item) => item.total_sold);
            const future_dates = forecastedSalesData.map((item) => item.forecast_date);
            const predicted_sales = forecastedSalesData.map((item) => item.predicted_sales);

            setChartData({
                labels: [...dates, ...future_dates],
                datasets: [
                    {
                        label: 'Actual Sales',
                        data: totalSold,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1,
                    },
                    {
                        label: 'Forecasted Sales',
                        data: [...new Array(dates.length).fill(null), ...predicted_sales], // Fill actual data with null, then add forecasted sales
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)', // Different color for forecasted sales
                        tension: 0.1,
                      },
                ],
            });
        }
    }, [actualSalesData, forecastedSalesData]);

  return (
        <Card>
            <Box p={2}>
                <Typography variant="h6">Daily Sales Data</Typography>
                <Line data={chartData} />
            </Box>
        </Card>
  )
}

SalesChart.propTypes = {
    actualSalesData: PropTypes.arrayOf(
        PropTypes.shape({
            sale_date: PropTypes.string.isRequired,  // The sale_date should be a string (formatted date)
            total_sold: PropTypes.oneOfType([        // total_sold can be a string or a number
                PropTypes.string,
                PropTypes.number
            ]).isRequired
        })
    ).isRequired,
    forecastedSalesData: PropTypes.arrayOf(
        PropTypes.shape({
            forecast_date: PropTypes.string.isRequired,  // The sale_date should be a string (formatted date)
            predicted_sales: PropTypes.oneOfType([        // total_sold can be a string or a number
                PropTypes.string,
                PropTypes.number
            ]).isRequired
        })
    ).isRequired,
  };


export default SalesChart
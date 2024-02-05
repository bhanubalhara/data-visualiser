import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ data }) => {
  const chartData = [];
    data.map((row) => {
        chartData.push({
            x: ['price','discount','rating','stock'],
            y: [row.price/10,(row.discount), (row.rating*100/5), (row.stock)],
            type: 'bar',
            name: row.title,
        });
    });

  const layout = {
    title: 'Product Plot',
    xaxis: { title: 'Features' },
    yaxis: { title: 'Values' },
    style: { width: 400, height: 300 }
  };

  return <Plot style={{paddingRight: '10px'}} data={chartData} layout={layout} />;
};

export default BarChart;
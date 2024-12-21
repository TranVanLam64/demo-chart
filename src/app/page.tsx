'use client'

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Home = () => {
  const [chartData, setChartData] = useState([
    [Date.now(), 3529.32], 
  ]);
  const [point, setPoint] = useState([Date.now(), 3529.32]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = [Date.now(), 3528 + Math.random() * 4]; 
      setChartData((prevData) => {
        const updatedData = [...prevData, newPoint];
        return updatedData.slice(-50); 
      });
      setPoint(newPoint); 
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const chartOptions = {
    chart: {
      type: "line",
      backgroundColor: "#121212",
      animation: Highcharts.svg, 
      scrollablePlotArea: {
        minWidth: 600, 
        scrollPositionX: 1,
      },
    },
    title: {
      text: null,
    },
    xAxis: {
      type: "datetime",
      tickPixelInterval: 100, 
      minPadding: 0,
      maxPadding: 0.2, 
      labels: {
        style: { color: "#ccc" },
        format: "{value:%H:%M:%S}",
      },
      gridLineColor: "#333", 
    gridLineWidth: 1,
    crosshair: false,
    },
    yAxis: {
      title: null,
      gridLineColor: "#333",
      labels: {
        style: { color: "#ccc" },
      },
      crosshair: false,
    },
    series: [
      {
        name: "Price",
        data: chartData,
        color: "#00ff00",
        marker: {
          enabled: false,
          radius: 4,
          fillColor: "#00ff00",
        },
        lineWidth: 2,
      },
    ],
    annotations: [
      {
        labels: [{
          point: {
            x: point[0], 
            y: point[1], 
            xAxis: 0,
            yAxis: 0,
          },
          text: 'Point A',
          style: {
            color: '#fff',
            fontWeight: 'bold',
          },
        }],
        shapes: [{
          type: 'path',
          points: [
            { x: point[0], y: 0 }, 
            { x: point[0], y: point[1] }, 
          ],
          lineWidth: 2,
          lineColor: '#ff0000', 
        },
        {
          type: 'path',
          points: [
            { x: 0, y: point[1] }, 
            { x: point[0], y: point[1] },  
          ],
          lineWidth: 2,
          lineColor: '#ff0000', 
        }],
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: {
          duration: 1500,
        },
        turboThreshold: 0, 
      },
    },
  };

  return (
    <div className="w-1/2">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Home;

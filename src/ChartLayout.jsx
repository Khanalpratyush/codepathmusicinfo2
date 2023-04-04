import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";

const ChartLayout = () => {
  const [
    accessToken,
    searchInput,
    setSearchInput,
    initialAlbumsData,
    setInitialAlbumsData,
    artistData,
    setArtistData,
  ] = useOutletContext();

  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState(null);
  const [maxTrack, setMaxTrack] = useState(0);

  const sortByReleasedDate = (albums) => {
    albums.sort(function (a, b) {
      return new Date(a.release_date) - new Date(b.release_date);
    });
    return albums;
  };

  const getFilteredData = () => {
    let returnData = [];
    initialAlbumsData.filter((checkData) => {
      let tempData = null;
      if (returnData.length > 0) {
        tempData = returnData.find(
          (potentialMatchdata, idx) => {
            console.log(potentialMatchdata.release_date.slice(0, 4));
            if (
              checkData.release_date.slice(0, 4) ===
              potentialMatchdata.release_date.slice(0, 4)
            ) {
              returnData[idx].total_tracks += checkData.total_tracks;
              return potentialMatchdata;
            }
          }
        );
        if (!tempData) {
          returnData.push(checkData);
        }
      } else {
        returnData.push(checkData);
      }
    });

    setMaxTrack(getMaxTrackCount(returnData));

    return sortByReleasedDate(returnData).map((data) => {
      return {
        name: data.release_date.slice(0, 4),
        "Total Tracks Released vs Published Year": data.total_tracks,
      };
    });
  };

  const getMaxTrackCount = (data) => {
    const maxCount = data.reduce((acc, next) => {
      return next.total_tracks > acc ? next.total_tracks : acc;
    }, -Infinity);
    return maxCount;
  };

  useEffect(() => {
    setData(getFilteredData());
  }, []);

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart width={700} height={400} data={data}>
            <Line
              type="monotone"
              dataKey="Total Tracks Released vs Published Year"
              stroke="rgb(189, 147, 219)"
              strokeWidth={3}
            />
            <CartesianGrid stroke="rgb(218, 205, 205)" />
            <XAxis dataKey="name" stroke="rgb(218, 205, 205)" />
            <YAxis stroke="rgb(218, 205, 205)" />
            <Tooltip />
            <Legend />
          </LineChart>
        );
        case "bar":
            return (
            <BarChart width={700} height={400} data={data}>
            <CartesianGrid stroke="rgb(218, 205, 205)" />
            <XAxis dataKey="name" stroke="rgb(218, 205, 205)" />
            <YAxis stroke="rgb(218, 205, 205)" domain={[0, maxTrack]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total Tracks Released vs Published Year" fill="rgb(189, 147, 219)" />
            </BarChart>
            );
            default:
            return null;
            }
            };
            
            return (
            <div>
            <h1>Charts</h1>
            <div>
            <label htmlFor="chart-type">Select Chart Type:</label>
            <select id="chart-type" value={chartType} onChange={handleChartTypeChange}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            
            </select>
            
            </div>
            {artistData && <div className='container stats-container'>
                            <div className="stat-card">{artistData ? "This artist has released a maximum of " + maxTrack + " tracks in a year" : ""}</div>
                    </div>}
            <div>{data ? renderChart() : "Loading..."}</div>
            </div>
            );
            };
            
            export default ChartLayout;
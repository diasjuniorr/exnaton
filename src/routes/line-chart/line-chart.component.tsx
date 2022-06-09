import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GroupedByDay {
  date: string;
  measurements: Measurement[];
}

const LineChartRoute = () => {
  const [data, setData] = useState<SmartMeterData[]>([]);
  const [currentDay, setCurrentDay] = useState<string>("");
  
  const location = useLocation()
  console.log("location", location.state)

  const filterByDay = (day: string, data: SmartMeterData[]) => {
    return data.find((item: GroupedByDay) => item.date === day)?.measurements;
  };

  useEffect(() => {
    const fetchMeasurementsByDay = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/meterdata/measurement"
      );
      const teste = await response.json();
      setData(teste);
      console.log("fetched data", teste);
    };

    fetchMeasurementsByDay();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setCurrentDay(data[0].date);
    }
  }, [data]);

  return (
    <div>
      {data.length > 0 && currentDay ? (
        <>
          <h1>Energy consumption </h1>
          <p>
            Per day from {data[0].date} to {data[data.length - 1].date}
          </p>
          <p>(Click on a date to see it's consumption during the day)</p>
          <LineChart
            width={1300}
            height={400}
            data={data}
            margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
            onClick={(e) => {
              setCurrentDay(e.activeLabel as string);
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              cursor={"pointer"}
              minTickGap={0}
              onClick={(e) => {
                setCurrentDay((e as unknown as Record<string, string>).value);
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="aETotalImport"
              name="Total Energy Import"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="aETotalExport"
              name="Total Energy Export"
              stroke="#82ca9d"
            />
          </LineChart>
          <p>Per hour on {currentDay}</p>
          <LineChart
            width={1300}
            height={400}
            data={filterByDay(currentDay, data)}
            margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name="Total Energy Import"
              dataKey="0100011D00FF"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              name="Total Energy Export"
              dataKey="0100021D00FF"
              stroke="#82ca9d"
            />
          </LineChart>
        </>
      ) : (
        <div>Fetching data...</div>
      )}
    </div>
  );
};

export default LineChartRoute;

interface Measurement {
  "0100011D00FF": number;
  "0100021D00FF": number;
  timestamp: string;
}

interface SmartMeterData {
  date: string;
  aETotalImport: string;
  aETotalExport: string;
  muid: string;
  measurement: string;
  measurements: Measurement[];
}

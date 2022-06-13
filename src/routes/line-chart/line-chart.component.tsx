import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

interface GroupedByDay {
  date: string;
  measurements: Measurement[];
}

const LineChartRoute = () => {
  const [data, setData] = useState<SmartMeterData[]>([]);
  const [currentDay, setCurrentDay] = useState<string>("");
  const navigate = useNavigate();

  const filterByDay = (day: string, data: SmartMeterData[]) => {
    return data.find((item: GroupedByDay) => item.date === day)?.measurements;
  };

  useEffect(() => {
    const data = sessionStorage.getItem("data");
    if (!data) {
      navigate("/");
    }

    setData(JSON.parse(data as string));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setCurrentDay(data[0].date);
    }
  }, [data]);

  return (
    <Box mt={1}>
      {data.length > 0 && currentDay ? (
        <Paper>
          <Box padding={3}>
            <Typography variant="h4" component="h1">
              Energy consumption{" "}
            </Typography>
            <Typography variant="subtitle2" component="p" ml={1}>
              Per day from {data[0].date} to {data[data.length - 1].date}
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              fontSize={14}
              ml={1}
              mb={5}
            >
              (Click on a date to see it's consumption during the day)
            </Typography>
            <LineChart
              width={1300}
              height={400}
              data={data}
              margin={{ top: 5, right: 40, left: 40, bottom: 5 }}
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
            <Typography variant="subtitle2" ml={1} mb={5} mt={5}>
              Per hour on {currentDay}
            </Typography>
            <LineChart
              width={1300}
              height={400}
              data={filterByDay(currentDay, data)}
              margin={{ top: 5, right: 40, left: 40, bottom: 5 }}
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
          </Box>
        </Paper>
      ) : (
        <div>Fetching data...</div>
      )}
    </Box>
  );
};

export default LineChartRoute;

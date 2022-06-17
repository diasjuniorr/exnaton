import { Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Metrics from "../../components/metrics.component";

interface Measurement {
  "0100011D00FF": number;
  "0100021D00FF": number;
  timestamp: string;
}

interface SmartMeterData {
  date: string;
  aETotalImport: number;
  aETotalExport: number;
  muid: string;
  measurement: string;
  measurements: Measurement[];
}

interface GroupedByDay {
  date: string;
  measurements: Measurement[];
}

interface Metrics {
  daysImported: number;
  daysExported: number;
  averageExported: string;
  averageImported: string;
}

const LineChartRoute = () => {
  const [data, setData] = useState<SmartMeterData[]>([]);
  const [currentDay, setCurrentDay] = useState<string>("");
  const [metrics, setMetrics] = useState<Metrics>({} as Metrics);
  const navigate = useNavigate();

  const getMetrics = (d: SmartMeterData[]) => {
    let daysExported = 0;
    let daysImported = 0;
    let averageExported = 0;
    let averageImported = 0;

    d.forEach((m: SmartMeterData) => {
      if (m.aETotalExport - m.aETotalImport > 0) {
        daysExported++;
      } else {
        daysImported++;
      }

      averageExported += m.aETotalExport;
      averageImported += m.aETotalImport;
    });

    return {
      daysImported,
      daysExported,
      averageExported: (averageExported / d.length).toFixed(3),
      averageImported: (averageImported / d.length).toFixed(3),
    };
  };

  const filterByDay = (day: string, data: SmartMeterData[]) => {
    return data.find((item: GroupedByDay) => item.date === day)?.measurements;
  };

  useEffect(() => {
    const data = sessionStorage.getItem("data");
    if (!data) {
      navigate("/");
    }

    const parsedData = JSON.parse(data as string);
    if (parsedData.length === 0) {
      navigate("/");
    }

    setData(parsedData);
    setMetrics(getMetrics(parsedData));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setCurrentDay(data[0].date);
    }
  }, [data]);

  return (
    <Box mt={1}>
      {data.length > 0 && currentDay && (
        <Paper>
          <Box padding={3}>
            <Typography variant="h4" component="h1">
              Energy consumption{" "}
            </Typography>
            <Typography variant="subtitle2" component="p" ml={1}>
              Metrics from {data[0].date} to {data[data.length - 1].date}
            </Typography>
            <Metrics metrics={metrics} />
            <Typography variant="h5" component="h1">
              Time series
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
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={1300}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
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
                    setCurrentDay(
                      (e as unknown as Record<string, string>).value
                    );
                  }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="aETotalImport"
                  name="Total Energy Import/Wh"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="aETotalExport"
                  name="Total Energy Export/Wh"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>

            <Typography variant="subtitle2" ml={1} mb={5} mt={5}>
              Every 15 minutes on {currentDay}
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={1300}
                height={300}
                data={filterByDay(currentDay, data)}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  name="Total Energy Import/Wh"
                  dataKey="0100011D00FF"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  name="Total Energy Export/Wh"
                  dataKey="0100021D00FF"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default LineChartRoute;

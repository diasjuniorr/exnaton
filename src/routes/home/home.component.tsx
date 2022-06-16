import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./home.styles.css";
import api from "../../services/api";
import { formatDate } from "../../utils/date.utils";

interface FormFields {
  meterID: string;
  measurement: string;
  start: Date;
  stop: Date;
}

const defaultFormFields = {
  meterID: "53d63d3d-1b29-49a6-8e5f-537c730f4d11",
  measurement: "energy",
  start: new Date(),
  stop: new Date(),
};

const Home = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleDateChange = (e: { name: string; value: Date }) => {
    const { name, value } = e;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async () => {
    const today = new Date();
    if (
      formFields.start > today ||
      formFields.stop > today ||
      formFields.start > formFields.stop
    ) {
      alert("Invalid date range");
      return;
    }

    const { meterID, measurement, start, stop } = formFields;
    try {
      const response = await api<Data[]>(
        `/meterdata/measurement?muid=${meterID}&measurement=${measurement}&start=${formatDate(
          start
        )}&stop=${formatDate(stop)}`
      );

      console.log(typeof response);
      sessionStorage.setItem("data", JSON.stringify(response));
      sessionStorage.setItem("formFields", JSON.stringify(formFields));

      if (response.length === 0) {
        toast.warning("No data for the selected date range");
        return;
      }

      navigate("/line-chart");
    } catch (e) {
      console.log(e);
      toast.error("Oops... something went wrong");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("formFields")) {
      const { meterID, measurement, start, stop } = JSON.parse(
        sessionStorage.getItem("formFields") as string
      );

      setFormFields({
        meterID,
        measurement,
        start: new Date(start),
        stop: new Date(stop),
      });
    }
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight="80vh"
    >
      <Container maxWidth="sm">
        <Paper>
          <div style={{ padding: "40px" }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Smart Meter Data Selection
            </Typography>
            <TextField
              id="outlined-basic"
              label="Meter ID"
              name="meterID"
              value={formFields.meterID}
              variant="standard"
              fullWidth
              onChange={handleChange}
              disabled
              margin="dense"
            />
            <TextField
              label="Measurement"
              variant="standard"
              name="measurement"
              value={formFields.measurement}
              fullWidth
              onChange={handleChange}
              disabled
              margin="dense"
            />
            <Box marginTop={2} display="flex" justifyContent={"space-between"}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={formFields.start}
                  maxDate={new Date()}
                  onChange={(newValue) => {
                    handleDateChange({
                      name: "start",
                      value: newValue as Date,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Stop Date"
                  value={formFields.stop}
                  minDate={formFields.start}
                  maxDate={new Date()}
                  onChange={(newValue) => {
                    handleDateChange({ name: "stop", value: newValue as Date });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box marginTop={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSubmit()}
              >
                View
              </Button>
            </Box>
          </div>
        </Paper>
      </Container>
      <ToastContainer />
    </Box>
  );
};

interface Data {
  date: string;
  measurement: string;
  aETotalImport: number;
  aETotalExport: number;
  measurements: Measurement[];
}

interface Measurement {
  "0100011D00F": number;
  "0100021D01F": number;
  time: string;
}

export default Home;

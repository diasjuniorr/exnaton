import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./home.styles.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

interface FormFields {
  meterID: string;
  measurement: string;
  start: Date | null;
  stop: Date | null;
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

  return (
    // <div className="authentication-container">
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
                onChange={(newValue) => {
                  handleDateChange({ name: "start", value: newValue as Date });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Stop Date"
                value={formFields.stop}
                minDate={formFields.start}
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
              onClick={() => navigate("/line-chart", { state: formFields })}
            >
              View
            </Button>
          </Box>
        </div>
      </Paper>
    </Container>

    // </div>
  );
};

export default Home;

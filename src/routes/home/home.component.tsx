import { Box, Button, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/form-input/form-input.component";
import "./home.styles.css";

interface FormFields {
  meterID: string;
  measurement: string;
  start: string;
  stop: string;
}

const defaultFormFields = {
  meterID: "53d63d3d-1b29-49a6-8e5f-537c730f4d11",
  measurement: "energy",
  start: "2022-04-01",
  stop: "2022-05-01",
};

const Home = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    // <div className="authentication-container">
    <Container maxWidth="sm">
      <Paper>
        <div style={{ padding: "40px" }}>
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

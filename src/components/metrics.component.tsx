import { Box, TextField } from "@mui/material";

interface MetricsProps {
  metrics: {
    daysImported: number;
    daysExported: number;
    averageExported: string;
    averageImported: string;
  };
}

const Metrics: React.FC<MetricsProps> = ({ metrics }) => {
  const { daysImported, daysExported, averageExported, averageImported } =
    metrics;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      paddingTop={3}
      paddingBottom={3}
    >
      <TextField
        id="outlined-basic"
        label="Days Exported"
        name="meterID"
        value={daysExported}
        variant="standard"
        disabled
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Days Imported"
        name="meterID"
        value={daysImported}
        variant="standard"
        disabled
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Average Exported p/ day (Wh)"
        name="meterID"
        value={averageExported}
        variant="standard"
        disabled
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Average Imported p/ day (Wh)"
        name="meterID"
        value={averageImported}
        variant="standard"
        disabled
        margin="dense"
      />
    </Box>
  );
};

export default Metrics;

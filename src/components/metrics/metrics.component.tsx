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
      paddingLeft={1}
      paddingRight={1}
      paddingTop={2}
      paddingBottom={2}
    >
      <TextField
        id="outlined-basic"
        label="Exported > Imported"
        name="meterID"
        value={`${daysExported} day(s)`}
        variant="standard"
        disabled
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Imported > Exported"
        name="meterID"
        value={`${daysImported} day(s)`}
        variant="standard"
        disabled
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Average Exported"
        name="meterID"
        value={`${averageExported} Wh/day`}
        variant="standard"
        disabled
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Average Imported"
        name="meterID"
        value={`${averageImported} Wh/day`}
        variant="standard"
        disabled
        margin="dense"
      />
    </Box>
  );
};

export default Metrics;

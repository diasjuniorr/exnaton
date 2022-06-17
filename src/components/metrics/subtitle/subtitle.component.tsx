import { Typography } from "@mui/material";

interface SubtitleProps {
  text: string;
  start: string;
  stop: string;
  duration: number;
}
const Subtitle: React.FC<SubtitleProps> = ({ text, start, stop, duration }) => {
  return (
    <Typography variant="subtitle2" component="p" ml={1}>
      {text}{" "}
      <Typography
        variant="subtitle2"
        component="span"
        color="blue"
      >{`${start}`}</Typography>{" "}
      to {""}
      <Typography variant="subtitle2" component="span" color="blue">
        {`${stop}`}
      </Typography>{" "}
      ({`${duration}`} days)
    </Typography>
  );
};

export default Subtitle;

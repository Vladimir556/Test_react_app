import {FC, useEffect} from 'react';
import {ILaunch} from "../../models/ILaunch";
import {Paper} from "@mui/material";

interface ILaunchCardProps {
  launch: ILaunch
}

const LaunchCard: FC<ILaunchCardProps> = ({
  launch
  }) => {

  const launchDate = new Date(launch.date_utc)

  return (
    <Paper
      sx={{
        p:2,
        display: 'flex',
        gap: '12px',
        width: '100%',
      }}
    >
      <img
        src={`${launch.links.flickr.original[0]}`}
        alt="rocket"
        height={200}
        width={200}
      />
      <div>
        <h2>{launch.name}</h2>
        <p>{launch.details}</p>
        <span>{launchDate.toLocaleDateString()} {launchDate.toLocaleTimeString()}</span>
      </div>
    </Paper>
  );
};

export default LaunchCard;

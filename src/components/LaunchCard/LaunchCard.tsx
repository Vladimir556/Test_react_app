import {FC} from 'react';
import {ILaunch} from "../../models/ILaunch";
import {IRocket} from "../../models/IRocket";
import {Paper} from "@mui/material";

interface ILaunchCardProps {
  launch: ILaunch,
  rocket?: IRocket
}

const LaunchCard: FC<ILaunchCardProps> = ({
  launch,
  rocket
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
        src={`${rocket?.flickr_images[0]}`}
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

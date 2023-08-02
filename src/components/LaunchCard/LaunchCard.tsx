import {FC} from 'react';
import {ILaunch} from "../../models/ILaunch";
import {IRocket} from "../../models/IRocket";
import {Box, Paper, useMediaQuery} from "@mui/material";

interface ILaunchCardProps {
  launch: ILaunch,
  rocket?: IRocket
}

const LaunchCard: FC<ILaunchCardProps> = ({
  launch,
  rocket
  }) => {

  const media = useMediaQuery('(min-width:480px)');

  const launchDate = new Date(launch.date_utc)

  return (
    <Paper
      sx={{
        p:2,
        display: 'flex',
        flexDirection: media ? 'row' : 'column',
        gap: '1rem'
      }}
    >
      <img
        src={`${rocket?.flickr_images[0]}`}
        alt="rocket"
        height={200}
        width={200}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div>
          <h2>{launch.name}</h2>
          <p>{launch.details}</p>
        </div>
        <span style={{textAlign: "right"}}>{`${launchDate.toLocaleDateString()} ${launchDate.toLocaleTimeString()}`}</span>
      </Box>
    </Paper>
  );
};

export default LaunchCard;

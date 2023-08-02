// React
import {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
// Redux
import {launchAPI} from "./services/LaunchService";
import {rocketAPI} from "./services/RocketService";
// Components
import {
  Box,
  Container,
  LinearProgress,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import LaunchCard from "./components/LaunchCard/LaunchCard";
// Types
import {SortType} from "./models/ILaunch";

const App = () => {

  const [page, setPage] = useState(1);
  const handleChangePage = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    window.scroll(0, 0)
    setPage(value);
  };

  const [sort, setSort] = useState<SortType>('asc');
  const handleChangeSorting = (
    event: MouseEvent<HTMLElement>,
    newSort: SortType,
  ) => {
    if (newSort) {
      setSort(newSort)
      setPage(1)
    }
  };

  const {data: launches, isFetching} = launchAPI.useFetchLaunchesQuery({page, sort})
  const {data: rockets} = rocketAPI.useFetchRocketsQuery()

  useEffect( () => {
    console.log(rockets)
  }, [launches, rockets]);

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        minHeight: '100vh',
        py: 1
      }}
    >
      {
        isFetching && <LinearProgress/>
      }

      <ToggleButtonGroup
        color="primary"
        value={sort}
        exclusive
        onChange={handleChangeSorting}
        aria-label="Platform"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          py: 1
        }}
      >
        <ToggleButton size="small" value="asc">old first</ToggleButton>
        <ToggleButton size="small" value="desc">new first</ToggleButton>
      </ToggleButtonGroup>

      <Stack spacing={2}>
        {launches?.docs?.map((launch) =>
          <LaunchCard
            launch={launch}
            rocket={rockets?.[`${launch.rocket}`]}
            key={launch.id}
          />
        )}
      </Stack>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItem: 'center',
          justifyContent: 'center',
          zIndex: 3,
          py: 1
        }}
      >

        <Pagination
          count={launches?.totalPages || 1}
          page={page}
          onChange={handleChangePage}
        />
      </Box>

    </Container>
  );
};

export default App;

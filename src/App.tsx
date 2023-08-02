// React
import {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
// Redux
import {launchAPI} from "./services/LaunchService";
// Components
import {
  Box,
  Container, Grid,
  LinearProgress,
  Pagination, Stack,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import LaunchCard from "./components/LaunchCard/LaunchCard";
// Types
import {ILaunch, SortType} from "./models/ILaunch";
import {rocketAPI} from "./services/RocketService";
import {useAppSelector} from "./hooks/redux";

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
    newSort && setSort(newSort)
  };

  const {data: launches, isLoading} = launchAPI.useFetchLaunchesQuery({page, sort})
  const {data: rockets, isLoading: isLoadingRockets} = rocketAPI.useFetchRocketsQuery()

  useEffect( () => {
    console.log(rockets)
  }, [launches, rockets]);

  return (
    <>
      <Container
        maxWidth={"xl"}
        sx={{
          minHeight: '100vh',
          py: 1
        }}
      >
        {
          isLoading && <LinearProgress/>
        }

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
          <p>
            Sort by:
          </p>
          <ToggleButtonGroup
            color="primary"
            value={sort}
            exclusive
            onChange={handleChangeSorting}
            aria-label="Platform"
          >
            <ToggleButton size="small" value="asc">ASC</ToggleButton>
            <ToggleButton size="small" value="desc">DESC</ToggleButton>
          </ToggleButtonGroup>
          <Pagination
            count={launches?.totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>

      </Container>
    </>
  );
};

export default App;

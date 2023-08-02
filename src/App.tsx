// React
import {useEffect, useState} from 'react';
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

const App = () => {

  const [page, setPage] = useState(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    window.scroll(0, 0)
    setPage(value);
  };

  const [sort, setSort] = useState<SortType>('asc');
  const handleChangeSorting = (
    event: React.MouseEvent<HTMLElement>,
    newSort: SortType,
  ) => {
    newSort && setSort(newSort)
  };

  const {data, isLoading} = launchAPI.useFetchLaunchesQuery({page, sort})

  return (
    <>
      <Container
        maxWidth={"xl"}
        sx={{
          minHeight: '100vh'
        }}
      >
        {
          isLoading && <LinearProgress/>
        }

        <Stack spacing={2}>
          {data?.docs?.map((launch) =>
            <LaunchCard
              launch={launch}
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
            count={data?.totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>

      </Container>
    </>
  );
};

export default App;

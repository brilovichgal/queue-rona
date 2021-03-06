import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import Header from './Header';

const USERS_PER_PAGE = 15;
const PAGE_INTERVAL_TIMEOUT = 3000;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    margin: '0 auto',
  },
  border: {
    borderLeft: 'rgba(0, 0, 0, 0.12) 2px solid',
  },
  pagination: {
    justifyContent: 'center',
  },
}));

const WaitingRoomLayout = ({
  users,
  stations,
  UserComponent,
  StationComponent,
  waitingRoomHeader,
  stationsHeader,
}) => {
  const [page, setPage] = React.useState(1);
  const {root, pagination, border} = useStyles();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setPage((p) => {
        const pagesCount = Math.ceil(users.length / USERS_PER_PAGE);
        return p < pagesCount ? p + 1 : 1;
      });
    }, PAGE_INTERVAL_TIMEOUT);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <Header text={waitingRoomHeader} />

        <Box height="70vh">
          <Grid className={root} container direction="column" spacing={1}>
            {users
              .slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE)
              .map((user) => (
                <Grid item key={user.id}>
                  <UserComponent {...user} />
                </Grid>
              ))}
          </Grid>

          <Pagination
            classes={{ul: pagination}}
            count={Math.ceil(users.length / USERS_PER_PAGE)}
            variant="outlined"
            page={page}
            onChange={(e, p) => setPage(p)}
          />
        </Box>
      </Grid>

      <Grid item xs={4} className={border}>
        <Header text={stationsHeader} />

        <Box height="70vh">
          <Grid
            container
            className={root}
            direction="column"
            spacing={1}
            xs={6}>
            {stations.map((station) => (
              <Grid item key={station.id}>
                <StationComponent {...station} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WaitingRoomLayout;

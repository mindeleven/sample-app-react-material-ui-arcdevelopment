import React from 'react'
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import animationData from '../animations/landinganimation/data';
import ButtonArrow from './ui/ButtonArrow';

const useStyles = makeStyles(theme => ({

}));

export default function LandingPage() {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justify="flex-end" alignItems="center" direction="row">
          <Grid item>
            <Typography variant="h2" align="center">
              Bringing West Coast Technology<br /> to the Midwest
            </Typography>
            <Grid container>
              <Grid item>
                <Button variant="contained">Free Estmate</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  Learn more
                  <ButtonArrow width={15} height={15} fill="red" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Lottie options={defaultOptions} height="100%" width="100%" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

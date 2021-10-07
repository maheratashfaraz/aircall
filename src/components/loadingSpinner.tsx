import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    wrapper: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export const LoadingSpinner = () => {
    const classes = useStyles();

    return (<div className={classes.wrapper}>
        <CircularProgress />
    </div>)
}
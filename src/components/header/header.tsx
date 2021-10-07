import React from 'react'
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        height: 48,
        padding: '24px',
    },
});

export const Header = () => {
    const classes = useStyles();
    return (<div id='header' className={classes.root}>
        <img id="logo" alt="logo" src="https://aircall.io/_nuxt/img/aircall-logo-small.dcd97dc.svg" />
    </div>)
}
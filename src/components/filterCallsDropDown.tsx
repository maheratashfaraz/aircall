import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';



const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '20px'
    },
    formControl: {
        width: '150px',
        marginLeft: '10px'
    }
});


type props = {
    filterType: string,
    updateFilterType: (type: string) => void;
}

export default function FilterCallsDropDown({ filterType, updateFilterType }: props) {

    const classes = useStyles();
    const handleChange = (event: SelectChangeEvent) => {
        updateFilterType(event.target.value as string)
    };

    return (
        <Box className={classes.root}>
            <Typography noWrap variant="body2">Filter By:</Typography>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterType}
                    onChange={handleChange}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                    <MenuItem value="missed">Missed</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

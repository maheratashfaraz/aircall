import * as React from 'react';
import Box from '@mui/material/Box';
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
    sortType: string,
    updateSortType: (type: string) => void;
}

export default function SortDateDropDown({ sortType, updateSortType }: props) {
    const classes = useStyles();

    const handleChange = (event: SelectChangeEvent) => {
        updateSortType(event.target.value as string)
    };

    return (
        <Box className={classes.root}>
            <Typography noWrap variant="body2">Sort By Date:</Typography>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortType}
                    onChange={handleChange}
                >
                    <MenuItem value="default" disabled>
                        <em><Typography variant='subtitle2'>select the value</Typography></em>
                    </MenuItem>
                    <MenuItem value="ascending">Ascending</MenuItem>
                    <MenuItem value="descending">Descending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

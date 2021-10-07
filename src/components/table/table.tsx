import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';
import { getCalls } from '../../services/getCalls'
import SortDateDropDown from '../sortDateDropDown'
import FilterCallsDropDown from '../filterCallsDropDown'
import Row from './row'
import { createData } from './helper/createData'


const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        overflow: 'hidden'
    },
    dropdownWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right'
    },
    tableHeader: {
        backgroundColor: "#50B08B"
    }
});

interface props {
    token: string
}


export default function CollapsibleTable({ token }: props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [callData, setCallData] = React.useState<ServerContributionData>({
        nodes: [],
        totalCount: 0,
        hasNextPage: false
    })
    const [rows, setRows] = React.useState<Data[]>([])
    const [originalListRows, setOriginalListRows] = React.useState<Data[]>([])
    const [offset, setOffset] = React.useState(0)
    const [sortType, setSortType] = React.useState("default")
    const [filterType, setFilterType] = React.useState("all")

    const limit = 10

    let temp: Data[] = []


    React.useEffect(() => {
        temp = []
        setRows([])
        if (token) {
            getCalls(token, offset, limit).then(res => {
                setCallData(res.data)
                res.data.nodes.map(call => temp.push(
                    createData(
                        call
                    )))
                setRows(temp)
                setOriginalListRows(temp)
            }).catch(e => {
                alert('There is an issue with fetching calls')
            })
        }
    }, [token, offset])

    React.useEffect(() => {
        temp = [...rows]
        if (rows.length > 0) {
            if (sortType === "ascending") {
                temp.sort((a, b) => (a.date < b.date) ? 1 : -1)
            } else if (sortType === "descending") {
                temp.sort((a, b) => (a.date > b.date) ? 1 : -1)
            }
            setRows(temp)
        }
    }, [sortType])

    React.useEffect(() => {
        temp = [...originalListRows]
        if (rows.length > 0) {
            if (filterType === "archived") {
                setRows(temp.filter(call => call.is_archived))
            } else if (filterType === "missed") {
                setRows(temp.filter(call => call.call_type === "missed"))
            }
            else if (filterType === "all") {
                setRows(originalListRows)
            }
        }
    }, [filterType])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        setOffset(newPage * 10 + 1)
    };

    return (
        <Paper id='table' className={classes.wrapper} >
            <div className={classes.dropdownWrapper}>
                <SortDateDropDown sortType={sortType} updateSortType={(type) => {
                    setSortType(type)
                }} />
                <FilterCallsDropDown filterType={filterType} updateFilterType={(type) => {
                    setFilterType(type)
                }} />
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead id='table-header'>
                        <TableRow id='table-header-row' className={classes.tableHeader}>
                            <TableCell />
                            <TableCell><Typography variant="h6">Number</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6">Direction</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6">Date</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.id} row={row} token={token} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                callData.totalCount && <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={callData.totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            }
        </Paper >);
}

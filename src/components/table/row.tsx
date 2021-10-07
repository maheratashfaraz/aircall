import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import { getCallArchived } from '../../services/getCallArchived'
import { addNote } from '../../services/addNote'
import { createData } from './helper/createData'

export default function Row(props: { row: ReturnType<typeof createData>, token: string }) {
    let { row, token } = props;
    const [rowToRender, setRowToRender] = React.useState(row)
    const [open, setOpen] = React.useState(false);
    const [newNote, setNewNote] = React.useState("");
    const [showAddNote, setShowAddNote] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {rowToRender.number}
                </TableCell>
                <TableCell align="right">{rowToRender.direction}</TableCell>
                <TableCell align="right">{rowToRender.date}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Call Details:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Duration:</TableCell>
                                        <TableCell>Is Archived?</TableCell>
                                        <TableCell align="right">Call type</TableCell>
                                        <TableCell align="right">Via</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={rowToRender.id}>
                                        <TableCell component="th" scope="row">
                                            {rowToRender.duration}
                                        </TableCell>
                                        <TableCell>{rowToRender.is_archived ? "Yes" : "No"} <a href='#'

                                            //currently archive endpoint returns 401 due to strict-origin-when-cross-origin (backend issue)

                                            onClick={() => getCallArchived(rowToRender.id, token).then(() => alert('Changes are done for archiving this call')).catch(e => { alert('There is an issue with archiving this call') })}>change</a></TableCell>
                                        <TableCell align="right">{rowToRender.call_type}</TableCell>
                                        <TableCell align="right">
                                            {rowToRender.via}
                                        </TableCell>
                                    </TableRow>
                                    {rowToRender.notes?.map(note => <TableRow key={note.id}>< TableCell>Note: {note.content}</TableCell></TableRow>)}
                                    <TableRow>
                                        < TableCell>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                                                {!showAddNote && <Button variant="contained" size='small' onClick={() => setShowAddNote(true)}>Add Note</Button>}
                                                {showAddNote && <TextField variant="outlined" value={newNote} onChange={(e) => setNewNote(e.target.value)} />}
                                                {showAddNote && <Button style={{ marginTop: '4px' }} size='small' variant="contained"
                                                    onClick={() => {
                                                        if (newNote !== "") {
                                                            addNote(newNote, rowToRender.id, token).then(res => {
                                                                setRowToRender(createData(res.data))
                                                            }).catch(e => {
                                                                alert('There is an issue with adding notes to this call')
                                                            })
                                                        }
                                                        setNewNote("")
                                                        setShowAddNote(false)
                                                    }}>Save</Button>}
                                                {showAddNote && <Button style={{ marginTop: '4px' }} size='small' variant="contained" onClick={() => {
                                                    setNewNote("")
                                                    setShowAddNote(false)
                                                }}>Cancel</Button>}
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}


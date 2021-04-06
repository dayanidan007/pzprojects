import axios from 'axios'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    table: {
        Width: '200px',
    },
    nameAndDate: {
        marginLeft: '25%',
    },
    commentsContainer: {
        marginTop: '10px',
        marginLeft: '25%',
    },

}));
export default function Home() {
    const tmpTable = []
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [comments, setComments] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [table, setTable] = useState(tmpTable)
    const [open, setOpen] = React.useState(false);
    const [num, setNum] = useState(1)

    const addNewRow = () => {
        let sum = price * quantity
        const newRow = {
            num: num,
            price: price,
            quantity: quantity,
            sum: sum
        }
        setNum(num + 1)
        setTable(tmptable => [...tmptable, newRow])
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChanges = (event) => {
        if (event.target.id === 'creator-name') {
            setName(event.target.value)
        }
        if (event.target.id === "date") {
            setDate(event.target.value)
        }
        if (event.target.id === "comments") {
            setComments(event.target.value)
        }
        if (event.target.id === "price") {
            setPrice(event.target.value)
        }
        if (event.target.id === "quantity ") {
            setQuantity(event.target.value)
        }
    }

    const saveToDataBase = async () => {
        const data = { name, date, comments, table }
        await axios.post('http://localhost:4200/form', data)
        window.location.reload(false);
    }
    const classes = useStyles();

    return (
        <div>
            <h1>HomeWork Project</h1>
            <div className={classes.nameAndDate}>
                <TextField id="creator-name" label="Creator Name" type="string" onChange={handleChanges} />
                <TextField
                    onChange={handleChanges}
                    style={{
                    }}
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue={new Date()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className={classes.commentsContainer}>
                <TextField
                    onChange={handleChanges}
                    id="comments"
                    label="Comments"
                    multiline
                    rows={15}
                    defaultValue="Write your comments"
                    variant="outlined"
                />
            </div>
            <div >
                <TableContainer>
                    <Table className={classes.table} aria-label="caption table"
                        style={{ width: '500px', marginLeft: '25%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Num</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Sum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.map((row) => (
                                <TableRow key={row.num}>
                                    <TableCell>{row.num}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.sum}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}
                    style={{ marginLeft: '25%' }}>
                    + Add new Row
      </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Row</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={handleChanges}
                            id="price"
                            label="Price"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            onChange={handleChanges}
                            id="quantity "
                            label="Quantity "
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
          </Button>
                        <Button onClick={addNewRow} color="primary">
                            Add
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Button onClick={saveToDataBase} color="primary"
                    style={{ marginLeft: '80%', backgroundColor: 'blue', color: 'white' }}>
                    Save
          </Button>
            </div>
        </div>

    )
}
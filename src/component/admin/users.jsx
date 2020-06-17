import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import _ from "lodash";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {
    fontWeight: 'bold',
  },
  cover: {
    width: 120,
    height: 120,
    margin: 20
  },
});


export default function Users({onUsers, onHandleUserDelete}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{marginTop: 100, marginRight: 100, width: '85%', paddingRight: 50, marginBottom: 150}}>
      <Typography variant='h4' style={{marginBottom: 50}}>All Users</Typography>
      <Table className={classes.table} aria-label="caption table">
      <caption>Total Users {onUsers.length}</caption>
        <TableHead>
          <TableRow>
            <TableCell  className={classes.head} align="right">Name</TableCell>
            <TableCell  className={classes.head} align="right">Email</TableCell>
            <TableCell  className={classes.head} align="right">Contact Number</TableCell>
            <TableCell  className={classes.head} align="right">Password</TableCell>
            <TableCell  className={classes.head} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {onUsers.map((user, i) => (
            <TableRow key={i}>
                <TableCell align="right">{user.fullName}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phoneNumber}</TableCell>
                <TableCell align="right">{user.password}</TableCell>
                <TableCell style={{paddingLeft: 80}}>  
                    <Button variant="outlined" color="secondary" onClick={()=>onHandleUserDelete(user)} >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

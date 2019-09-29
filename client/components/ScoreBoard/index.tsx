import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            overflowX: 'auto',
            overflowY: 'auto',
        },
        table: {
            minWidth: 200
        },
        head: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white
        },
        headCell:{
            color: theme.palette.common.white
        }
    });

interface TeamRecord {
    team: string;
    score: number;
    position: number;
}

const data: TeamRecord[] = [
    {  position: 1, team: 'pixel', score: 9001 },
    {  position: 2, team: 'anotherTeam', score: 8000 },
    {  position: 3, team: 'anotherTeam2', score: 7000 },
    {  position: 4, team: 'anotherTeam3', score: 4000 }
];

interface ScoreBoardProps extends WithStyles<typeof styles> {}

class ScoreBoard extends React.Component<ScoreBoardProps> {
    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.headCell} align="left">Position</TableCell>
                            <TableCell className={classes.headCell} align="left">Team</TableCell>
                            <TableCell className={classes.headCell} align="left">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={row.team}>
                                <TableCell align="left">{row.position}</TableCell>
                                <TableCell align="left">{row.team}</TableCell>
                                <TableCell align="left">{row.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(ScoreBoard);

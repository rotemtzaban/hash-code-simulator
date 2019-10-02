import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import TeamResult from '../Models/TeamResult';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            overflowX: 'auto',
            overflowY: 'auto',
            margin: 'auto',
            maxHeight: "35vh",
            maxWidth: 900
        },
        table: {
            minWidth: 200,
        },
        head: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white
        },
        headCell: {
            color: theme.palette.common.white
        },
        best: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white
        }
    });


interface ScoreBoardProps extends WithStyles<typeof styles> {
    data: TeamResult
}

class TeamScoreBoard extends React.Component<ScoreBoardProps> {
    render() {
        const classes = this.props.classes;
        const topScore = this.props.data.topScore.a + this.props.data.topScore.b + this.props.data.topScore.c + this.props.data.topScore.d + this.props.data.topScore.e;
        return (
            <Paper className={classes.root} style={{overflow: "auto"}}>
                <div style={{ overflowY: "auto" }}>
                    <Table className={classes.table}>
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell className={classes.headCell} align="left">a</TableCell>
                                <TableCell className={classes.headCell} align="left">b</TableCell>
                                <TableCell className={classes.headCell} align="left">c</TableCell>
                                <TableCell className={classes.headCell} align="left">d</TableCell>
                                <TableCell className={classes.headCell} align="left">e</TableCell>
                                <TableCell className={classes.headCell} align="left">total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={1} className={classes.best}>
                                <TableCell align="left">{this.props.data.topScore.a}</TableCell>
                                <TableCell align="left">{this.props.data.topScore.b}</TableCell>
                                <TableCell align="left">{this.props.data.topScore.c}</TableCell>
                                <TableCell align="left">{this.props.data.topScore.d}</TableCell>
                                <TableCell align="left">{this.props.data.topScore.e}</TableCell>
                                <TableCell align="left">{topScore}</TableCell>
                            </TableRow>
                            {this.props.data.submissions.map((row, i) => (
                                <TableRow key={i + 2}>
                                    <TableCell align="left">{row.a}</TableCell>
                                    <TableCell align="left">{row.b}</TableCell>
                                    <TableCell align="left">{row.c}</TableCell>
                                    <TableCell align="left">{row.d}</TableCell>
                                    <TableCell align="left">{row.e}</TableCell>
                                    <TableCell align="left">{row.a + row.b + row.c + row.d + row.e}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(TeamScoreBoard);

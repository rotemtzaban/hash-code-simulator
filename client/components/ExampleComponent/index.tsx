import { WithStyles, Button, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles'

interface Props extends WithStyles<typeof styles> {
    foo: number;
}

class Example extends React.Component<Props, {}>
{
    render() {
        const { classes, foo } = this.props
        return (
            <div>
                <Button className={classes.root} >Example of ts + styles {foo} </Button>
            </div>)
    }
}

export default withStyles(styles)(Example)
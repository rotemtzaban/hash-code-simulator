import { Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { style } from '@material-ui/system';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
    createStyles({
        card: {},
        media: {
            height: 140
        }
    });

interface Props extends WithStyles<typeof styles> {}
function QuestionCard(props: Props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        The Problem
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Photo slideshow The rise of digital photography creates
                        an interesting challenge: what should we do with all of
                        these ...
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions autoCapitalize="false">
                <Button
                    size="small"
                    color="primary"
                    style={{ textTransform: 'none' }}
                    href="/api/download/question/2019"
                    download
                >
                    View Problem
                </Button>
                <Button
                    size="small"
                    color="primary"
                    style={{ textTransform: 'none' }}
                    href="/api/download/input/2019"
                    download
                >
                    Download Input Files
                </Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(QuestionCard);

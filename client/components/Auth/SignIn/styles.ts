import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        marginRight: "auto",
        marginLeft: "auto"
    },
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

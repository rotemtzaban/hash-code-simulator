import { green } from '@material-ui/core/colors';
import { Theme, createStyles } from '@material-ui/core/styles';

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
        backgroundColor: green[500],
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signup: {
        margin: theme.spacing(0.3, 0, 2),
        textDecoration: "none"
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        width: "100%"
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -13,
        marginLeft: -13,
    },
});

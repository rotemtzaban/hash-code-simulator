import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        file: {
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: theme.spacing(2),
            textTransform:'none'
        },
        button: {
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: theme.spacing(2),
            textTransform:'none'
        },
        dialog: {
            textAlign: 'center'
        },
        modal: {
            position: 'absolute',
            width:300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top:'50%',
            left: '50%',
            marginLeft: -150,
        }
    });

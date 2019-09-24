import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) => createStyles({
    root: {
        color: theme.palette.primary.toString(),
        background: "red",
    },
    paper: { /* ... */ },
    button: { /* ... */ },
});

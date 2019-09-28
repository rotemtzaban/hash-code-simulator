import Dialog from '@material-ui/core/Dialog';
import React, { ChangeEvent } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { AuthComponenetProps } from '../Auth/AuthManager/AuthProvider';
import AuthManager from '../Auth/AuthManager/AuthManager';
import Popover from '@material-ui/core/Popover';
import styles from './styles';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

interface SubmissionDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;
}

interface SubmissionDialogState {
    files: { [key: string]: Blob | null };
    isSubmitting: boolean;
    showPopover: boolean;
    popoverMessage: string | null;
}

class SubmissionDialog extends React.Component<SubmissionDialogProps, SubmissionDialogState> {
    constructor(props: SubmissionDialogProps) {
        super(props);
        this.state = {
            files: {},
            isSubmitting: false,
            showPopover: false,
            popoverMessage: null
        };
    }

    onFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files && ev.target.files[0];
        const { files } = { ...this.state };
        files[ev.target.name] = file;
        this.setState({ files: files });
    };

    onFormSubmit = async () => {
        const formdata = new FormData();
        const files = this.state.files;
        for (const key in files) {
            const file = files[key];
            if (file) {
                formdata.append(key, file);
            }
        }

        this.setState({ isSubmitting: true });
        const response = await fetch('/api/submitSolution', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${AuthManager.getToken()}`
            },
            method: 'POST',
            body: formdata
        });

        if (response.ok) {
            this.setState({
                isSubmitting: false,
                showPopover: true,
                popoverMessage: 'Submitted Solution Successfully'
            });
        } else {
            this.setState({
                isSubmitting: false,
                showPopover: true,
                popoverMessage: 'Something went wrong with your submission'
            });
        }
    };

    closePopover = () => {
        this.setState({ showPopover: false, popoverMessage: null });
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Submit Solution</DialogTitle>
                <Modal open={this.state.showPopover} onClose={this.closePopover}>
                    <div className={this.props.classes.modal}>{this.state.popoverMessage}</div>
                </Modal>
                <DialogContent className={this.props.classes.dialog}>
                    <div>
                        <Button color="primary" component="label" variant="contained">
                            Upload Solution a_example
                            <Input
                                className={this.props.classes.file}
                                type="file"
                                onChange={this.onFileChange}
                                name={'a'}
                                disableUnderline={true}
                                style={{ display: 'none' }}
                            ></Input>
                        </Button>
                    </div>
                    <Input
                        className={this.props.classes.file}
                        type="file"
                        onChange={this.onFileChange}
                        name={'b'}
                    ></Input>
                    <Input
                        className={this.props.classes.file}
                        type="file"
                        onChange={this.onFileChange}
                        name={'c'}
                    ></Input>
                    <Input
                        className={this.props.classes.file}
                        type="file"
                        onChange={this.onFileChange}
                        name={'d'}
                    ></Input>
                    <Input
                        className={this.props.classes.file}
                        type="file"
                        onChange={this.onFileChange}
                        name={'e'}
                    ></Input>
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            className={this.props.classes.button}
                            onClick={this.onFormSubmit}
                        >
                            Submit Solutions
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SubmissionDialog);

import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import { DialogActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export interface SimpleDialogProps {
  children: React.ReactNode;
  fullScreen: boolean;
  handleSave: () => void;
  open: boolean;
  onClose: () => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
  const { children, handleSave, onClose } = props;

  const defaultHandleSave = () => {
    console.log('Save action not implemented.');
  };

  // Use the provided handleSave or the default one
  const effectiveHandleSave = handleSave || defaultHandleSave;

  const handleClose = () => {
    onClose();
    console.log('here');
  };

  const handleListItemClick = () => {
    onClose();
  };

  const dialogProps = {
    ...props,
    onClose: handleListItemClick,
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Characteristics Form</DialogTitle>
      {children}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => effectiveHandleSave()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;

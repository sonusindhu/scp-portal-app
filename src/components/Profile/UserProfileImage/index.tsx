import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar as Avat } from '@material-ui/core';
import Avatar from 'react-avatar-edit';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const UserProfileImage = () => {
  const [open, setOpen] = React.useState(false);

  const src = 'http://localhost:3000/images/2.jpg'
  const [state, setState] = useState<any>({
    preview: null,
    src
  });


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onClose = () => {
    setState({preview: null})
  }
  
  const onCrop = (preview) => {
    setState({preview})
  }

  const onBeforeFileLoad = (elem) => {
    if(elem.target.files[0].size > 71680){
      elem.target.value = "";
    };
  }

  return (
    <div>
      <Avat
        alt="Remy Sharp"
        src="/images/2.jpg"
        variant="circular"
        onClick={handleClickOpen}
        className="avatar-profile"
      />
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update Profile image
        </BootstrapDialogTitle>
        <DialogContent dividers>
          
        <Avatar
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={state.src}
        />
        <img src={state.preview} alt="Preview" />
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save Image
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default UserProfileImage;
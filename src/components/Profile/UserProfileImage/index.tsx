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
import UserService from '../../../services/user.service';

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
  disabled?: boolean
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
          disabled={props.disabled}
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
  let [isLoading, setIsLoading] = useState<boolean>(false);

  const [open, setOpen] = React.useState(false);

  const src = '/images/2.jpg'
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
    setState({ preview: null })
  }
  
  const onCrop = (preview) => {
    setState({ preview })
  }

  const onBeforeFileLoad = (elem) => {
    if(elem.target.files[0].size > 71680){
      elem.target.value = "";
    };
  }

  const uploadUserImage = () => {
    setIsLoading(true);
    UserService.uploadUserImage(state)
      .then((response) => {
        console.log(response)
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      
      <Avat
        alt="Remy Sharp"
        src={src}
        variant="circular"
        onClick={handleClickOpen}
        className="avatar-profile"
      />
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" 
          onClose={handleClose} disabled={isLoading}>
          Update Profile image
        </BootstrapDialogTitle>
        <DialogContent dividers className='user-image-dialog'>          
          
          <div className='profile-container'>
            <Avatar
              width={400}
              height={400}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={state.src}
            />
            
            <div>
              <img src={state.preview} alt="Preview" />
            </div>
          </div>

          
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={uploadUserImage} disabled={isLoading}>
            Save Image
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default UserProfileImage;
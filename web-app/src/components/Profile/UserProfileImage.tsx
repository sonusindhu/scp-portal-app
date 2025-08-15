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
import UserService from '../../services/user.service';

import toast from "../../utils/toast.util";

const API_URL = process.env.REACT_APP_API_URL;

const VALID_SIZE_LIMIT = 5*1024*1024;

const VALID_IMG_EXT = ['jpg', 'jpeg', 'gif', 'bmp', 'png'];

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

interface ImageState{
  preview: string | null,
  src?: string | null
}

const UserProfileImage = (props) => {

  const img = `${API_URL}user-images/${props.user?.userImage}`;
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [userImage, setUserImage] = useState<string>(img);
  
  const [open, setOpen] = React.useState(false);  
  const [state, setState] = useState<ImageState>({
    preview: null,
    src: null
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const onClose = () => {
    setState({ preview: null, src: null })
  }
  
  const onCrop = (preview: string) => {
    setState({ preview })
  }

  const getExtension = (filename: string) => {
    const parts = filename.split('.');
    return parts.at(-1) || '';
  }

  const isImage = (filename: string) => {    
    const ext = getExtension(filename);    
    return VALID_IMG_EXT.some(i => i.includes(ext));
  }

  const onBeforeFileLoad = (elem) => {
    const fileName = elem.target.value;
    if(elem.target.files[0].size > VALID_SIZE_LIMIT){
      setState({ preview: null, src: null })
      elem.target.value = "";
      toast.error('Your image size exceeded to 5mb, please try other images');
    } else if(!isImage(fileName)){
      toast.error('Invalid image, allowed extension: png, jpg, jpeg, git, bmp');
    }
  }

  const uploadUserImage = () => {
    setIsLoading(true);
    UserService.uploadUserImage(state)
      .then((response) => {
        if (response.status) {
          const img = `${API_URL}user-images/${response.result.userImage}`;
          setUserImage(img);
          setIsLoading(false);
          handleClose();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        setIsLoading(false);
        toast.error(response.message);
      });
  };

  return (
    <div>

      <div className='user-header'>
        <Avat
          alt={props.user.fullName}
          src={userImage}
          variant="circular"
          onClick={handleClickOpen}
          className="avatar-profile"
        />

        <div className='user-details'>
          <p className='full-name'> <strong>{ props.user.fullName }</strong></p>
          <p className='job-title'><strong>{ props.user.jobTitle }</strong></p>
          <p  className='department'><strong>{ props.user.location }</strong></p>
        </div>

      </div>
      
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
            />
            
            <div>
              { state.preview ? <img src={state.preview} alt="Preview" /> : <></> }              
            </div>
          </div>

          
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={uploadUserImage} disabled={isLoading || !state.preview}>
            Save Image
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default UserProfileImage;
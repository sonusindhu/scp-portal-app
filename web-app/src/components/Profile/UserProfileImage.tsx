import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Cropper from 'react-easy-crop';
import UserService from '../../services/user.service';
import toast from "../../utils/toast.util";
import { useFormSubmit } from '../../hooks';

const API_URL = import.meta.env.VITE_API_URL;

const VALID_SIZE_LIMIT = 5*1024*1024;

const VALID_IMG_EXT = ['jpg', 'jpeg', 'gif', 'bmp', 'png'];

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

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

  const { handleSubmit } = useFormSubmit({
    onSuccess: (response) => {
      const userImageValue = response?.data?.userImage;
      const img = `${API_URL}user-images/${userImageValue}`;
      setUserImage(img);
      setIsLoading(false);
      handleClose();
    },
  });

  const uploadUserImage = async () => {
    setIsLoading(true);
    const success = await handleSubmit(() => UserService.uploadUserImage(state));
    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <div>

      <div className='user-header'>
        <Avatar
          onClick={handleClickOpen}
          className="avatar-profile cursor-pointer"
        >
          <AvatarImage src={userImage} alt={props.user.fullName} />
          <AvatarFallback>{props.user.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className='user-details'>
          <p className='full-name'> <strong>{ props.user.fullName }</strong></p>
          <p className='job-title'><strong>{ props.user.jobTitle }</strong></p>
          <p  className='department'><strong>{ props.user.location }</strong></p>
        </div>

      </div>
      
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="user-image-dialog max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Profile image</DialogTitle>
          </DialogHeader>
          <div className='profile-container'>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > VALID_SIZE_LIMIT) {
                  toast.error('Your image size exceeded 5mb, please try other images');
                  return;
                }
                if (!isImage(file.name)) {
                  toast.error('Invalid image, allowed extension: png, jpg, jpeg, gif, bmp');
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  setState(s => ({ ...s, src: reader.result as string }));
                };
                reader.readAsDataURL(file);
              }}
              disabled={isLoading}
              className="mb-4"
            />
            {state.src && (
              <Cropper
                image={state.src}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
            <div>
              { state.preview ? <img src={state.preview} alt="Preview" /> : <></> }
            </div>
          </div>
          <DialogFooter>
            <Button onClick={uploadUserImage} disabled={isLoading || !state.preview}>
              Save Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserProfileImage;
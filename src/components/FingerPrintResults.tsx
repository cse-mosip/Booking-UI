import * as React from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import {FingerPrintDetails, SetDialogOpenFunction} from "../types";
import FingerPrintFailed from '../../public/assets/images/fingerprint_failed.jpg'
import FingerPrintSuccess from '../../public/assets/images/fingerprint_success.jpg'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
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

function BootstrapDialogTitle(props: DialogTitleProps) {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 1,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}


export const FingerPrintResults = ({
                                     open,
                                     setOpen,
                                     access,
                                     booking
                                   }: { open: boolean, setOpen: SetDialogOpenFunction, access: boolean, booking: FingerPrintDetails }) => {


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {
            access ? (
              <>
                <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
                  <img style={{borderRadius: '50%'}}
                       src={FingerPrintSuccess}
                       alt={'fingerprint success'}/>
                </Grid>
                <Grid mt={1} container direction={"column"} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant={"h6"} color={'green'} fontWeight={'bold'}>
                    Successfully Recognized
                  </Typography>

                  <Typography variant={'h4'} fontWeight={"bold"}>
                    {booking.username}
                  </Typography>
                </Grid>
                <Grid mt={2} spacing={2} container direction={"row"} alignItems={'center'}
                      justifyContent={'space-between'}>
                  <Grid item>
                    <Typography variant={'body2'}>
                      {booking.timeslot}
                    </Typography>
                  </Grid>
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <Typography variant={'body2'}>
                      Count: {booking.count}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
                  <img style={{borderRadius: '50%'}}
                       src={FingerPrintFailed}
                       alt={'fingerprint success'}/>
                </Grid>
                <Typography gutterBottom variant={"h6"} color={'red'} mt={1}>
                  No Booking for this Timeslot
                </Typography>
              </>
            )
          }


        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
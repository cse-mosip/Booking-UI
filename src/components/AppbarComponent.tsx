import { ExitToApp } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import UniversityLogo from '../../public/assets/images/University_of_Moratuwa_logo.png';
import {useDispatch} from 'react-redux';
import {enqueueUser, removeUser} from 'src/redux/user/actions';
import authServices from 'src/services/AuthServices';
import { User } from 'src/types';
import { AppState } from 'src/redux/reducer';
import { useSelector } from 'react-redux';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppbarComponent({ open, toggleDrawer }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: User | null = useSelector((state: AppState) => state.user.user);
  const token = user.token;
  
  const handleLogout = async () => {
    const isLogOut = await authServices.logout(token);
    if(isLogOut){
      dispatch(removeUser());
      navigate("/");
    }
  };

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <RouterLink to={'/dashboard'}>
          <Avatar
            src={UniversityLogo}
            alt="University of Moratuwa"
            sx={{ width: 40, height: 40 }}
            variant="rounded"
          />
        </RouterLink>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          <RouterLink
            style={{
              // Remove <a> tag styling
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/dashboard'}
          >
            Dashboard
          </RouterLink>
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToApp />
          Logout
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
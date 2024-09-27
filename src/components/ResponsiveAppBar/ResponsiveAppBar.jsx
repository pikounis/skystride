import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import TimerDialog from './components/TimerDialog/TimerDialog';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const pages = ['Home', 'Activity', 'Leaderboard', 'Teams'];
const settings = ['Settings', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // State to handle the dialog open/close
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageNavigation = (page) => {
    handleCloseNavMenu();
    if (page === 'Home') {
      navigate('/');
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const handleUserMenuClick = (setting) => {
    if (setting === 'Logout') {
      // logout functionality here after we do Spring booooot
      console.log('Logout clicked');
    } else if (setting === 'Settings') {
      navigate('/settings');
    }
    handleCloseUserMenu();
  };

  // Handlers for opening and closing the dialog
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ededed' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: { xs: 'space-between', md: 'flex-start' } }}>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: 'black' }} /> {/* Set color to black */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageNavigation(page)}>
                  <Typography sx={{ textAlign: 'center', color: '#707070', '&:hover': { color: '#3348d1' } }}>{page}</Typography> {/* Set text color */}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link to="/">
            <Box
              component="img"
              sx={{
                height: 34,
                display: { xs: 'flex', md: 'flex' },
                mx: { xs: 'auto', md: 'inherit' },
                pr: 1,
                mb: 0.7,
                mt: { xs: 1, md: 0 },
              }}
              alt="Sky Stride Logo"
              src="/sky_stride_no_background.png"
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageNavigation(page)}
                sx={{
                  my: 1,
                  ml: 1,
                  color: '#707070', // Set button text color to black
                  display: 'block',
                  textTransform: 'capitalize',
                  fontSize: '16px',
                  '&:hover': { color: '#3348d1' }, // Set hover colour
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleDialogOpen} sx={{ p: 0 }}>
                <AccessTimeIcon sx={{ color: 'black', fontSize: 40 }} /> {/* Set icon color to black */}
              </IconButton>
            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: 'black', fontSize: 40 }} /> {/* Set icon color to black */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                  <Typography
                    sx={{ textAlign: 'center', color: '#707070', '&:hover': { color: '#3348d1' } }}>{setting}
                  </Typography> {/* Set menu item color */}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* FullScreenDialog component */}
      <TimerDialog open={dialogOpen} onClose={handleDialogClose} />
    </AppBar>
  );
}

export default ResponsiveAppBar;

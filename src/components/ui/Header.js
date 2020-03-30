import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px"
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    opacity: 1
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  }

//  menuItem: {
//    ...theme.typography.tab,
//    opacity: 0.7
//    "&:hover": {
//      opacity: 1
//    }
//  }
}));

export default function Header (props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  }

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  }

  const menuOptions = [
    { name: 'Services', link: '/services', activeIndex: 1, setSelectedIndex: 0 },
    { name: 'Custom Software Development', link: '/customsoftware', activeIndex: 1, setSelectedIndex: 1 },
    { name: 'Mobile App Development', link: '/mobileapps', activeIndex: 1, setSelectedIndex: 2 },
    { name: 'Website Development', link: '/websites', activeIndex: 1, setSelectedIndex: 3 }
  ];

  const routes = [
    {name: 'Home', link: '/', activeIndex: 0},
    {
       name: 'Services',
       link: '/services',
       activeIndex: 1,
       ariaOwns: anchorEl ? "simple-menu" : undefined,
       ariaPopup: anchorEl ? "true" : undefined,
       mouseOver: (event) => handleClick(event)
    },
    {name: 'The Revolution', link: '/revolution', activeIndex: 2},
    {name: 'About Us', link: '/about', activeIndex: 3},
    {name: 'Contact Us', link: '/contact', activeIndex: 4}
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch(window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex ) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
        break;
        default:
        break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes])

  const tabs = (
    <React.Fragment>
      <Tabs
        onChange={handleChange}
        value={value}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
      {routes.map((route, index) => (
        <Tab
          aria-owns={route.ariaOwns}
          aria-haspopup={route.ariaPopup}
          className={classes.tab}
          component={Link}
          onMouseOver={route.mouseOver}
          key={`${route}${index}`}
          to={route.link}
          label={route.name}
        />
      ))}
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{paper: classes.menu}}
        MenuListProps={{onMouseLeave: handleClose}}
        elevation={0}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option.name + i}
            onClick={(event) => {handleMenuItemClick(event, i); handleClose(); setValue(1);}}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route, index) => (
            <ListItem
              key={`${route}${index}`}
              onClick={() => {setOpenDrawer(false); setValue(route.activeIndex)}}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
            >
              <ListItemText
                className={value === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected].join(' ') : classes.drawerItem}
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            className={classes.drawerItemEstimate}
            onClick={() => {setOpenDrawer(false); setValue(5)}}
            divider
            button
            component={Link}
            to="/estimate"
            selected={value === 5}
          >
            <ListItemText
              className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected].join(' ') : classes.drawerItem}
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters={true}>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => {setValue(0)}}
            >
              <img className={classes.logo} alt="company logo" src={logo} />
            </Button>
            { matches ? drawer : tabs }
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}

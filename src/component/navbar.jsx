import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// for side bar
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import {Link } from "react-router-dom";
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    left: 30,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function PrimarySearchAppBar({wishList, cart, onProducts, onHandleCatogriesProduct, onHandleSearch, searchedValue, onCurrentUser}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
  const categories = [];
  categories.push("All");
  onProducts.map(product => {
      if (categories.indexOf(product.type) === -1) {
          categories.push(product.type)
      }
  });

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/home/profile/accountDetails">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  //mobile Menu
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton title="cart" color="inherit" style={{marginTop: -8}}>
              <Badge badgeContent={cart.length} color="secondary">
                <Link to={`/home/cart`}>
                  <ShoppingCartIcon style={{color: "#3f51b5"}} />
                </Link>
              </Badge>
        </IconButton >
        <Link to={`/home/cart`}>
          <p style={{marginTop: 8}} >Cart</p>
        </Link>
      </MenuItem>

      <MenuItem>
        <IconButton title="Wish List" color="inherit" style={{marginTop: -8}}>
              <Link to={`/home/wishList`}>
                <Badge badgeContent={wishList.length} color="secondary">
                  <FavoriteIcon style={{color: "#3f51b5"}} />
                </Badge>
              </Link>
        </IconButton>
        <Link to={`/home/wishList`}>   
          <p style={{marginTop: 8}}>Wish list</p>
        </Link>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          style={{color: '#3f51b5'}}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p style={{marginBottom: -3}}>Profile</p>
      </MenuItem>
    </Menu>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // side bar menues
  const list = (anchor) => (
    <div
      style={{marginTop: 20}}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <Typography style={{marginBottom: 20}} align="center" variant="h5">Categories</Typography>
      </List>
      <Divider />
      <List style={{marginTop: 20}}>
        {categories.map((text, index) => (
          <ListItem button key={text} onClick={()=>onHandleCatogriesProduct(text)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{marginLeft: 5}}
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={state.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
          
          <Link to="/home" style={{marginLeft: 0}}>
            <Typography className={classes.title} variant="h6" noWrap style={{color: 'white'}}>
              Home
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={onHandleSearch}
              value={searchedValue}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* menu items */}
              {
                (_.isEmpty(onCurrentUser) ? <React.Fragment><Link to="/home/login" style={{marginRight: 30, marginTop: 10}}>
                  <Typography className={classes.title} variant="h6" noWrap style={{color: 'white'}}>
                    Login
                  </Typography>
                  </Link>
                  <Link to="/home/register" style={{marginRight: 50, marginTop: 10}}>
                    <Typography className={classes.title} variant="h6" noWrap style={{color: 'white'}}>
                      Register
                    </Typography>
                  
                  </Link> </React.Fragment> : 
                    <React.Fragment>
                      <Link to="/home/logout" style={{marginRight: 20, marginTop: 10}}>
                        <Typography className={classes.title} variant="h6" noWrap style={{color: 'white'}}>
                          Logout
                        </Typography>
                     </Link>
                  </React.Fragment>
                )
              }

            {/* shoping cart */}
            <IconButton title="Wish List" color="inherit" style={{marginTop: -8}}>
              <Badge badgeContent={cart.length} color="secondary">
                <Link to={`/home/cart`}>
                  <ShoppingCartIcon style={{color: "white"}} />
                </Link>
              </Badge>
            </IconButton >

              {/* Wish list */}  
            <IconButton title="Wish List" color="inherit" style={{marginTop: -8}}>
              <Link to={`/home/wishList`}>
                <Badge badgeContent={wishList.length} color="secondary">
                  <FavoriteIcon style={{color: "white"}} />
                </Badge>
              </Link>
            </IconButton>

            {!_.isEmpty(onCurrentUser) ?
              <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              title={onCurrentUser.fullName}
              >
                <AccountCircle />
              </IconButton> : null
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

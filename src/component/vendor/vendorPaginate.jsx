import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

    

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
 
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      color: 'red'
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

class VendorPaginate extends Component {

   

    state = {
        mobileOpen: false,
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };
 

      render() { 
        const container = window !== undefined ? () => window.document.body : undefined;
        const selectedId = window.location.pathname.substr(6);
        const classesActive1 = selectedId === "vendor/profile" ? {activeColor: '#aeb2b2', color: '#202833'} : {activeColor: '', color: ''};
        const classesActive2 = selectedId === "vendor/orders" ? {activeColor: '#aeb2b2', color: '#202833'} : {activeColor: '', color: ''};
        const classesActive3 = selectedId === "vendor/products" ? {activeColor: '#aeb2b2', color: '#202833'} : {activeColor: '', color: ''};
        const classesActive4 = selectedId === "vendor/newproduct" ? {activeColor: '#aeb2b2', color: '#202833'} : {activeColor: '', color: ''};
        const classesActive5 = selectedId === "vendor/earning" ? {activeColor: '#aeb2b2', color: '#202833'} : {activeColor: '', color: ''};
        
        return ( 
            <div className={useStyles.root} style={{backgroundColor: '#202833', color: 'white'}}>
                <CssBaseline />
                    <IconButton
                        hidden={true}
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={this.handleDrawerToggle}
                        className={useStyles.menuButton}
                        
                    >
                        <MenuIcon />
                    </IconButton>                   
                <nav className={useStyles.drawer} aria-label="mailbox folders" >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            
                            container={container}
                            variant="temporary"
                            anchor={useTheme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                            paper: useStyles.drawerPaper,
                            }}
                            ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                        <div>
                            <div className={useStyles.toolbar} />
                            <Divider />
                                <p style={{marginTop: 15, marginBottom: 15, color: '#66fcf1', fontSize: 18}}>Vendor Dashboard</p>
                            <Divider />
                            <List>
                                <NavLink onClick={this.activeClass}  to="/home/vendor/profile" style={{color: 'white'}}>    
                                    <ListItem style={{backgroundColor: classesActive1.activeColor}} button key='Add Product'>
                                        <ListItemIcon><InboxIcon style={{color: 'white'}} /></ListItemIcon>
                                        <ListItemText style={{color: classesActive1.color}} primary='Account details' />
                                    </ListItem>
                                </NavLink>
                                <NavLink onClick={this.activeClass} to="/home/vendor/orders" style={{color: 'white'}}>    
                                    <ListItem style={{backgroundColor: classesActive2.activeColor}} button >
                                        <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                        <ListItemText style={{color: classesActive2.color}} primary='Orders' />
                                    </ListItem>
                                </NavLink>
                                <NavLink onClick={this.activeClass} to="/home/vendor/products" style={{color: 'white'}}>    
                                    <ListItem style={{backgroundColor: classesActive3.activeColor}} button >
                                        <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                        <ListItemText style={{color: classesActive3.color}} primary='Products' />
                                    </ListItem>
                                </NavLink>
                                <NavLink onClick={this.activeClass} to="/home/vendor/newproduct" style={{color: 'white'}}>    
                                    <ListItem style={{backgroundColor: classesActive4.activeColor}} button >
                                        <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                        <ListItemText style={{color: classesActive4.color}} primary='Add Product' />
                                    </ListItem>
                                </NavLink>
                            </List>
                            <Divider />
                            <List>
                                <NavLink onClick={this.activeClass} to="/home/vendor/earning" style={{color: 'white'}}>    
                                    <ListItem style={{backgroundColor: classesActive5.activeColor}} button >
                                        <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                        <ListItemText style={{color: classesActive5.color}} primary='Earning' />
                                    </ListItem>
                                </NavLink>
                            </List>
                        </div>

                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <div
                            classes={{
                            paper: useStyles.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                        <div>
                            <div className={useStyles.toolbar} />
                                <Divider />
                                    <p style={{marginTop: 15, marginBottom: 15, color: '#66fcf1', fontSize: 18}}>Vendor Dashboard</p>
                                <Divider />
                                <List>
                                    <NavLink onClick={this.activeClass}  to="/home/vendor/profile" style={{color: 'white'}}>    
                                        <ListItem style={{backgroundColor: classesActive1.activeColor}} button key='Add Product'>
                                            <ListItemIcon><InboxIcon style={{color: 'white'}} /></ListItemIcon>
                                            <ListItemText style={{color: classesActive1.color}} primary='Account details' />
                                        </ListItem>
                                    </NavLink>
                                    <NavLink onClick={this.activeClass} to="/home/vendor/orders" style={{color: 'white'}}>    
                                        <ListItem style={{backgroundColor: classesActive2.activeColor}} button >
                                            <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                            <ListItemText style={{color: classesActive2.color}} primary='Orders' />
                                        </ListItem>
                                    </NavLink>
                                    <NavLink onClick={this.activeClass} to="/home/vendor/products" style={{color: 'white'}}>    
                                        <ListItem style={{backgroundColor: classesActive3.activeColor}} button >
                                            <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                            <ListItemText style={{color: classesActive3.color}} primary='Products' />
                                        </ListItem>
                                    </NavLink>
                                    <NavLink onClick={this.activeClass} to="/home/vendor/newproduct" style={{color: 'white'}}>    
                                        <ListItem style={{backgroundColor: classesActive4.activeColor}} button >
                                            <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                            <ListItemText style={{color: classesActive4.color}} primary='Add Product' />
                                        </ListItem>
                                    </NavLink>
                                </List>
                                <Divider />
                                <List>
                                    <NavLink onClick={this.activeClass} to="/home/vendor/earning" style={{color: 'white'}}>    
                                        <ListItem style={{backgroundColor: classesActive5.activeColor}} button >
                                            <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                            <ListItemText style={{color: classesActive5.color}} primary='Earning' />
                                        </ListItem>
                                    </NavLink>
                                </List>
                            </div>
                        </div>
                    </Hidden>
                </nav>
            </div>
        );
    }
}
 
export default VendorPaginate;
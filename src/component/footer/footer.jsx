import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "./footer.scss"
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles = makeStyles({
    faG:{
        fontSize: '60px',
        textAlign: 'center',
        color: 'black',
    },
    faT:{
        fontSize: '60px',
        textAlign: 'center',
        color: '#55ACEE',
    },
    faI:{
        fontSize: '60px',
        textAlign: 'center',
        color: '#E0427D',
    },
    faW:{
        fontSize: '60px',
        textAlign: 'center',
        color: '#48C857',
    },
    fa:{
        fontSize: '60px',
        textAlign: 'center',
        color: '#3b5998',
    },
    footer: {
        backgroundColor: '#384659',
        paddingBottom: 30,
        paddingTop: 70
    }

});

const Footer = () => {
    const classes = useStyles();
  return (
    <footer>
      <div className={classes.footer}>
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <a className="buttonAndButton">
             <FacebookIcon className={classes.fa} />
            </a>
          </li>
          <li className="list-inline-item">
            <a className="buttonAndButtonG">
             <GitHubIcon className={classes.faG} />
            </a>
          </li>
          <li className="list-inline-item">
            <a className="buttonAndButtonT">
             <TwitterIcon className={classes.faT} />
            </a>
          </li>
          <li className="list-inline-item">
            <a className="buttonAndButtonI">
             <InstagramIcon className={classes.faI} />
            </a>
          </li>
          <li className="list-inline-item">
            <a className="buttonAndButtonW">
             <WhatsAppIcon className={classes.faW} />
            </a>
          </li>
        </ul>
      </div>
      <div className="row" style={{backgroundColor: '#202833', marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -15, paddingTop: 10, paddingBottom: 10}}>
        <div className="col-md-12">
          <span style={{color: 'white'}}>&copy; {new Date().getFullYear()} Copyright: </span><a href="#"> E-Commerce.com </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
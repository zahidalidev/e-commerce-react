import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

class VendorsOrderEarning extends Component {
    state = {
        orders: [],
        grossRevenue: 0,
        netRevenue: 0,
        numberOfOrders: 0,
        numberOfItemSold: 0,
        averageOrderValue: 0
    }
    componentDidMount = () => {
        const {onOrder, onVendor_id} = this.props;
        let vendorOrders = []; 
        
        onOrder.map(orders => {
            let ord = orders.cart.filter(order => order.vendor_id === onVendor_id);
            if(ord.length > 0){
                vendorOrders.push(ord);
            }
        })

        let numberOfItemSold = 0;
        let grossRevenue = 0;
        let numberOfOrder = 0;
        vendorOrders.map(orders => {
            orders.map(order => {
                numberOfItemSold = numberOfItemSold + (order.quantity);
                grossRevenue = grossRevenue + (order.quantity * order.price);
            })
            numberOfOrder = numberOfOrder + 1;
        })
        let netRevenue = parseInt(grossRevenue * 0.8);
        let averageOrderValue = parseInt(netRevenue/numberOfItemSold);
        
        this.setState({orders: vendorOrders, numberOfOrders: vendorOrders.length, grossRevenue, netRevenue, numberOfItemSold, averageOrderValue})
        // console.log("o: ",vendorOrders, "onOrder: ", onOrder);
    }
    // variant={}
    render() { 
        const {grossRevenue, netRevenue, numberOfOrders, numberOfItemSold, averageOrderValue} = this.state;
        return ( 
            <div style={{marginTop: 170}}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button >Total</Button>
                    <Button  >This Month</Button>
                    <Button >Last Month</Button>
                    <Button   >This Year</Button>
                </ButtonGroup>
                <div className="row" style={{marginRight: '-62px !important', marginTop: 120}}>
                    <div className="col-md-4" style={{marginLeft: -31}}>
                        <Card className={useStyles.root} variant="outlined">
                            <CardContent>
                                <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                GROSS REVENUE
                                </Typography>
                                <Typography variant="body2" component="p">
                                Rs{grossRevenue}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-md-4" style={{marginLeft: -31}}>
                        <Card className={useStyles.root} variant="outlined">
                            <CardContent>
                                <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                NET REVENUE
                                </Typography>
                                <Typography variant="body2" component="p">
                                Rs{netRevenue}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-md-4" style={{marginLeft: -31}}>
                        <Card className={useStyles.root} variant="outlined">
                            <CardContent>
                                <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                NUMBER OF ORDERS
                                </Typography>
                                <Typography variant="body2" component="p">
                                {numberOfOrders}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>  
                <div className="row" style={{marginRight: '-62px !important', marginBottom: 150}}>
                    <div className="col-md-4" style={{marginLeft: -31}}>
                        <Card className={useStyles.root} variant="outlined">
                            <CardContent>
                                <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                AVERAGE ORDER VALUE
                                </Typography>
                                <Typography variant="body2" component="p">
                                Rs{averageOrderValue}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-md-4" style={{marginLeft: -31}}>
                        <Card className={useStyles.root} variant="outlined">
                            <CardContent>
                                <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                NUMBER OF ITEM SOLD
                                </Typography>
                                <Typography variant="body2" component="p">
                                {numberOfItemSold}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-md-4" style={{marginLeft: -31}}>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default VendorsOrderEarning;
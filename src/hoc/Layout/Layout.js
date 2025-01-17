import React,{Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component{
    state ={
        showSideDrawer:false
    }
    closeSideDrawerHandler=()=>{
        this.setState({
            showSideDrawer:false
        })
    }
    toggleDrawerHandler = ()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:  !prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Aux>
                <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <Toolbar isAuthenticated={this.props.isAuthenticated} toggleDrawer={this.toggleDrawerHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
        </Aux>

        )
    }
} 

const mapStateToProps = state => { 
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);
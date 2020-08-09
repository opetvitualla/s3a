import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import './Leftsidebar.css';
import * as $ from 'jquery';
class LeftsidebarSuperAdmin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Tab: '', SubTab: '', MoreTab: ''
        };
    }
    setActiveTab = (tab,subtab,moretab, e) => {
      $('.waves-effect').removeClass('active');
      $('.submenu li').removeClass('active');
        // console.log(tab+"---"+subtab+"---"+moretab);

        this.setState({Tab: tab,SubTab: subtab,MoreTab: moretab});
    }

    render() {
        return (
           <div className="left side-menu">
              <div className="slimscroll-menu remove-scroll" id="remove-scroll">
                  <div id="sidebar-menu">
                       <ul className="metismenu" id="side-menu">
                           <li>
                               <Link to='/dashboard' title="Main Dashboard" className={this.state.Tab=='dashboard' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'dashboard', '', '')}>
                               <i className="mdi mdi-view-dashboard"></i> <span> Main Dashboard </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/SuperMonthlyInventory' title="Monthly Inventory"  className={this.state.Tab=='SuperMonthlyInventory' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'SuperMonthlyInventory', '', '')}>
                               <i className="ti-home"></i><span> Inventory </span>
                               </Link>
                           </li>
                           <li>
                               <Link to='/SuperPurchaseOrder' title="Purchase Order"  className={this.state.Tab=='SuperPurchaseOrder' ? 'waves-effect active': 'waves-effect'} onClick={this.setActiveTab.bind(this, 'SuperPurchaseOrder', '', '')}>
                               <i className=" fas fa-cart-plus"></i><span> Purchase Order </span>
                               </Link>
                           </li>
                       </ul>
                  </div>
                  <div className="clearfix"></div>
              </div>
            </div>

        );
    }
}


export default LeftsidebarSuperAdmin;

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
    setActiveTab = (tab, subtab, moretab, e) => {
        $('.waves-effect').removeClass('active');
        $('.submenu li').removeClass('active');
        // console.log(tab+"---"+subtab+"---"+moretab);

        this.setState({ Tab: tab, SubTab: subtab, MoreTab: moretab });
    }

    render() {
        return (
            <div className="left side-menu">
                <div className="slimscroll-menu remove-scroll" id="remove-scroll">
                    <div id="sidebar-menu">
                        <ul className="metismenu" id="side-menu">
                            <li>
                                <Link to='/dashboard' title="Main Dashboard" className={this.state.Tab == 'dashboard' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'dashboard', '', '')}>
                                    <i className="mdi mdi-view-dashboard"></i> <span> Main Dashboard </span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to='/SuperMonthlyInventory' title="Monthly Inventory" className={this.state.Tab == 'SuperMonthlyInventory' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'SuperMonthlyInventory', '', '')}>
                                    <i className="ti-home"></i><span> Inventory </span>
                                </Link>
                            </li> */}
                            <li>
                                <Link to='javascript:void(0);' title="Inventory" className={this.state.Tab == 'inventory' ? 'waves-effect active' : 'waves-effect'} >
                                    <i className="ti-home"></i><span> Inventory  <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span></span>
                                </Link>
                                <ul className="submenu">
                                    <li className={this.state.Tab == 'super-daily-inventory' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'super-daily-inventory', '', '')}><Link to="super-daily-inventory">Daily Inventory</Link></li>
                                    <li className={this.state.Tab == 'super-monthly-inventory' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'super-monthly-inventory', '', '')}><Link to="super-monthly-inventory">Monthly Inventory</Link></li>
                                    <li className={this.state.Tab == 'SuperMonthlyInventory' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'SuperMonthlyInventory', '', '')}><Link to="SuperMonthlyInventory">Approve Inventory</Link></li>
                                </ul>
                            </li>
                            {/* <li>
                                <Link to='/SuperPurchaseOrder' title="Purchase Order" className={this.state.Tab == 'SuperPurchaseOrder' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'SuperPurchaseOrder', '', '')}>
                                    <i className=" fas fa-cart-plus"></i><span> Purchase Order </span>
                                </Link>
                            </li> */}
                            <li>
                                <Link to='javascript:void(0);' title="Purchase Order" className={this.state.Tab == 'inventory' ? 'waves-effect active' : 'waves-effect'} >
                                    <i className="fas fa-cart-plus"></i><span> P.O  <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span></span>
                                </Link>
                                <ul className="submenu">
                                    <li className={this.state.Tab == 'super-purchase-order' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'super-purchase-order', '', '')}><Link to="super-purchase-order">Purchase Order</Link></li>
                                    <li className={this.state.Tab == 'SuperPurchaseOrder' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'SuperPurchaseOrder', '', '')}><Link to="SuperPurchaseOrder">Approve P.O.</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to='/SuperSalesOrder' title="Sales Orders" className={this.state.Tab == 'SuperSalesOrder' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'SuperSalesOrder', '', '')}>
                                    <i className="mdi mdi-cash-usd"></i><span> Sales Orders </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/super-warehouse' title="Ware House" className={this.state.Tab == 'super-warehouse' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'super-warehouse', '', '')}>
                                    <i className="mdi mdi-store"></i><span> Warehouse </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/super-printing-department' title="Printing" className={this.state.Tab == 'super-printing-department' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'super-printing-department', '', '')}>
                                    <i className="mdi mdi-printer"></i><span> Printing </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/super-production-department' title="Production" className={this.state.Tab == 'super-production-department' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'super-production-department', '', '')}>
                                    <i className="ion-gear-b"></i><span> Production </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/super-return' title="Return" className={this.state.Tab == 'super-return' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'super-return', '', '')}>
                                    <i className="mdi mdi-redo"></i><span> Return </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/super-expenses' title="Expenses" className={this.state.Tab == 'super-expenses' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'super-expenses', '', '')}>
                                    <i className="fas fa-wallet"></i><span> Expenses </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='javascript:void(0);' title="Inventory" className={this.state.Tab == 'inventory' ? 'waves-effect active' : 'waves-effect'} >
                                    <i className="ti-home"></i><span> Reports  <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span></span>
                                </Link>
                                <ul className="submenu">
                                    <li className={this.state.Tab == 'super-customer-report' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'super-customer-report', '', '')}><Link to="super-customer-report">Customer</Link></li>
                                    <li className={this.state.Tab == 'super-rawmaterial-report' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'super-rawmaterial-report', '', '')}><Link to="super-rawmaterial-report">Raw Materials</Link></li>
                                    <li className={this.state.Tab == 'super-expenses-report' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'super-expenses-report', '', '')}><Link to="super-expenses-report">Expenses</Link></li>
                                    <li className={this.state.Tab == 'super-sales-report' ? 'active' : ''} onClick={this.setActiveTab.bind(this, 'super-sales-report', '', '')}><Link to="super-sales-report">Sales Order</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to='/super-manage-user' title="Users" className={this.state.Tab == 'super-manage-user' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'super-manage-user', '', '')}>
                                    <i className="mdi mdi-account"></i><span> Users </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/super-customer' className={this.state.Tab == 'super-customer' ? 'waves-effect active' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'super-customer', '', '')}>
                                    <i className="mdi mdi-account-multiple"></i><span> Customers </span>
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

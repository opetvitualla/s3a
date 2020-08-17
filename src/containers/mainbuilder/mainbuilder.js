import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../MainContent/Dashboard/Dashboard';
// import Dashboard from '../MainContent/Dashboard/Dashboard2';
import RawMaterials from '../MainContent/RawMaterials/RawMaterials';
import Warehouse from '../MainContent/Warehouse/Warehouse';
import Return from '../MainContent/Return/Return';
import PurchaseOrder from '../MainContent/PurchaseOrder/PurchaseOrder';
import DailyInventory from '../MainContent/Inventory/DailyInventory';
import MonthlyInventory from '../MainContent/Inventory/MonthlyInventory';
import PrintingDepartment from '../MainContent/PrintingDepartment/Index';
import ProductionDepartment from '../MainContent/ProductionDepartment/Production';
import SalesOrder from '../MainContent/SalesOrder/SalesOrder';
import Users from '../MainContent/Users/Users';
import BlankPage from '../MainContent/Extras/Blankpage';
import Container from '../MainContent/Customer/Container';
import Expenses from '../MainContent/Expenses/Index';
import ProductionContainer from '../MainContent/ProductionDepartment/Container';
import Login from '../Auth/Login';
import Helper from '../../config/Helper';
import NotFound from '../Restrictions/NotFound';


// Warehouse USER IMPORTS
import WarehouseUser_dashboard from '../MainContent/Warehouse/Warehouse';
import WarehouseUser_jobsheet from '../WarehouseManager/Jobsheet/JobOrders';
import WarehouseUser_request from '../WarehouseManager/Request/ViewRequest';

// Reports
import CustomerReport from "../MainContent/Reports/CustomerReport";
import RawMaterialReport from "../MainContent/Reports/RawMaterialReport";
import ReportExpenses from "../MainContent/Reports/ReportExpenses";
import SalesReport from "../MainContent/Reports/SalesReport";

// Production
import Production from '../MainContent/ProductionDepartment/Production';
import RequestList from '../MainContent/ProductionDepartment/RequestList';

// Printing
import PrintingProduction from '../MainContent/PrintingDepartment/JobOrder';
import PrintingRequestList from '../MainContent/PrintingDepartment/RequestList';


// Super Admin
import SuperMonthlyInventory from '../SuperAdmin/MonthlyInventory/MonthlyInventory';
import SuperPurchaseOrder from '../SuperAdmin/PurchaseOrder/PurchaseOrder';
import SuperSalesOrder from '../SuperAdmin/SalesOrder/SalesOrder';
import SuperWarehouse from '../SuperAdmin/Warehouse/Warehouse';
import SuperPrintingDepartment from '../SuperAdmin/PrintingDepartment/Index';
import SuperProductionDepartment from '../SuperAdmin/ProductionDepartment/Production';
import SuperReturn from '../SuperAdmin/Return/Return';
import SuperExpenses from '../SuperAdmin/Expenses/Index';
import SuperCustomerReport from "../SuperAdmin/Reports/CustomerReport";
import SuperRawMaterialReport from "../SuperAdmin/Reports/RawMaterialReport";
import SuperReportExpenses from "../SuperAdmin/Reports/ReportExpenses";
import SuperSalesReport from "../SuperAdmin/Reports/SalesReport";
import SuperUser from "../SuperAdmin/Users/Users";
import SuperCustomer from "../SuperAdmin/Customer/Container";
import SupDailyInventory from '../SuperAdmin/Inventory/DailyInventory';
import SupMonthlyInventory from '../SuperAdmin/Inventory/MonthlyInventory';
import SupPurhaseOrder from '../SuperAdmin/PurchaseOrder/NewPurchaseOrder';


class mainbuilder extends Component {

    render() {

        console.log(Helper.getUserDetail('type'))
        switch (parseInt(Helper.getUserDetail('type'))) {
            case 0:
                return (
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/raw_material" component={RawMaterials} />
                        <Route path="/warehouse" component={Warehouse} />
                        <Route path="/purchase-order" component={PurchaseOrder} />
                        <Route path="/daily-inventory" component={DailyInventory} />
                        <Route path="/monthly-inventory" component={MonthlyInventory} />
                        <Route path="/printing-department" component={PrintingDepartment} />
                        <Route path="/production-department" component={ProductionContainer} />
                        <Route path="/return" component={Return} />
                        <Route path="/salesOrder" component={SalesOrder} />
                        <Route path="/reports-customer-report" component={CustomerReport} />
                        <Route path="/reports-raw-report" component={RawMaterialReport} />
                        <Route path="/reports-expenses" component={ReportExpenses} />
                        <Route path="/reports-sales-report" component={SalesReport} />
                        <Route path="/users" component={Users} />
                        <Route path="/customer" component={Container} />
                        <Route path="/expenses" component={Expenses} />
                        <Route path="/blank_page" component={BlankPage} />
                        <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login} />
                    </Switch>
                );
                break;

            case 1:
                return (
                    <Switch>
                        <Route path="/warehouse" component={Warehouse} />
                        <Route path="/jobsheet" component={WarehouseUser_jobsheet} />
                        <Route path="/request" component={WarehouseUser_request} />
                        <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login} />
                    </Switch>
                )
                break;
            case 3:
                return (
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/production-job-order" component={Production} />
                        <Route path="/production-request-material" component={RequestList} />
                        <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login} />
                    </Switch>
                )
                break;
            case 2:
                return (
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/printing-department" component={PrintingProduction} />
                        <Route path="/printing-request-material" component={PrintingRequestList} />
                        <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login} />
                    </Switch>
                )
                break;
            case 4:
                return (
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/salesOrder" component={SalesOrder} />
                        <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login} />
                    </Switch>
                )
                break;
            case 6:
                return (
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/SuperMonthlyInventory" component={SuperMonthlyInventory} />
                        <Route path="/SuperPurchaseOrder" component={SuperPurchaseOrder} />
                        <Route path="/SuperSalesOrder" component={SuperSalesOrder} />
                        <Route path="/super-warehouse" component={SuperWarehouse} />
                        <Route path="/super-printing-department" component={SuperPrintingDepartment} />
                        <Route path="/super-production-department" component={SuperProductionDepartment} />
                        <Route path="/super-return" component={SuperReturn} />
                        <Route path="/super-expenses" component={SuperExpenses} />
                        <Route path="/super-customer-report" component={SuperCustomerReport} />
                        <Route path="/super-rawmaterial-report" component={SuperRawMaterialReport} />
                        <Route path="/super-expenses-report" component={SuperReportExpenses} />
                        <Route path="/super-sales-report" component={SuperSalesReport} />
                        <Route path="/super-manage-user" component={SuperUser} />
                        <Route path="/super-customer" component={SuperCustomer} />
                        <Route path="/super-daily-inventory" component={SupDailyInventory} />
                        <Route path="/super-monthly-inventory" component={SupMonthlyInventory} />
                        <Route path="/super-purchase-order" component={SupPurhaseOrder} />



                        <Route path="/" component={Helper.isLoggedIn() ? Dashboard : Login} />
                    </Switch>
                )
                break;
            default:

        }

    }
}

export default mainbuilder;

import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import Config from '../../../config/Config';
import Helpers from '../../../Helpers';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import DatePicker from "react-datepicker";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

class ViewJobOrder extends Component {

    constructor(props) {
        super(props);
        Alertify.defaults = Config.AlertConfig
        this.validator = new SimpleReactValidator();
        this.state = {
            js_data: [],
        }
    }


    render() {
        const { job_order_data } = this.props;
        return (
            <AUX>
                <Modal size="lg" isOpen={this.props.isModalOpen} toggle={() => this.props.set_toggle_modal('isModalOpen')} className="">
                    <ModalHeader toggle={() => this.props.set_toggle_modal('isModalOpen')}>View Job Order</ModalHeader>
                    <ModalBody>
                        <table id="first_table" className="table table-bordered mb-0 first_table">
                            <tbody>
                                <tr>
                                    <td>
                                        <Label className="withClose">Customer</Label>
                                        <p>{this.props.job_order_data_cust.company}</p>
                                    </td>

                                    <td>
                                        <Label className="control-label">Description</Label>
                                        <p>{this.props.job_order_data_cust.description}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {
                            this.props.job_order_data_company.map((dat, k) => {
                                return (
                                    <table id="view_js_table" className="table table-bordered mb-0 view_js_table">
                                        <tbody>
                                            <tr>
                                                <td colSpan="4">
                                                    <Label>Job:</Label>
                                                    <span> {dat.job}</span>
                                                </td>
                                            </tr>
                                            {

                                                this.props.job_order_data.map((data, idk) => {
                                                    return (

                                                        (data.id == dat.id)?
                                                            <tr>
                                                                <td>
                                                                    <Label>Substrate</Label>
                                                                    <p>{data.substrate}</p>
                                                                </td>
                                                                <td>
                                                                    <Label>Cap</Label>
                                                                    <p>{data.cap}</p>
                                                                </td>
                                                                <td>
                                                                    <Label>Quantity</Label>
                                                                    <p>{data.quantity}</p>
                                                                </td>
                                                                <td>
                                                                    <Label>Top Seal</Label>
                                                                    <p>{data.top_seal}</p>
                                                                </td>
                                                            </tr>
                                                        :''

                                                    )
                                                })
                                            }
                                            <tr>
                                                <td colSpan="2">
                                                    <Label>Special Instructions</Label>
                                                    <p>{dat.special_instruction}</p>
                                                </td>
                                                <td colSpan="2">
                                                    <Label>Additional Details</Label>
                                                    <p>{dat.additional_details}</p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan="4">
                                                    <Label>Dispatch Date</Label>
                                                    <p>{dat.dispatch_date}</p>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                );
                            })
                        }
                    </ModalBody>
                </Modal>
            </AUX>

        )
    }
}
const mapStateToProps = state => {
    return {
        isModalOpen: state.warehouseReducer.isModalOpen,
        salesOrder_job: state.warehouseReducer.salesOrder_job,
        job_order_data: state.warehouseReducer.job_order_data,
        job_order_data_company: state.warehouseReducer.job_order_data_company,
        job_order_data_cust: state.warehouseReducer.job_order_data_cust,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL', state: state }),
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(ViewJobOrder);

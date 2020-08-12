import React, { Component } from "react";
import AUX from '../../../hoc/Aux_';
import { Row, Col, Label, ModalBody, ModalFooter, Button, Input, Form } from 'reactstrap';
import Config from "../../../config/Config";
import axios from "axios";
import Moment from 'moment';
import Alertify from 'alertifyjs';

class UpdateJobSheet extends Component {
    constructor(props) {
        super(props);
        Alertify.defaults = Config.AlertConfig
        this.state = {
            js_data: [],
            department_data: [],
            workInProgress: 0,
            completed: 0,
            delivered: 0,
            job: '',
        }
    }

    componentDidMount() {
        this.getJobSheetData();
    }
    getJobSheetData = async () => {
        let id = this.props.js_id;
        let url = Config.base_url + 'printingdepartment/GetJobSheetData/' + id,
            response = await axios.get(url);

        if (response.data.msg == 'success') {
            this.setState({ js_data: response.data.result.all_data, department_data: response.data.result.department});
        }

    }
    updateDeliverBtn = async(e) => {
        e.preventDefault();
        let response;
        let id = this.props.js_id
        const {workInProgress, completed,delivered, job }      = this.props.updatejob;
        let url = Config.base_url + 'warehouse/updateDelivery/'+id;
        const formData  = new FormData(e.target);

        formData.append('workInProgress' , workInProgress);
        formData.append('delivered' , delivered);
        formData.append('completed' , completed);
        formData.append('job' , job);

        response = await axios.post(url, formData);


        if (response.data) {
           Alertify.success('Successfully Approved!');
           this.setState({modalOpenDeliver: false});
           this.props.refresh(this.props.job_sheet_id);
       }else if(response.data == 0){
           Alertify.error('Stocks not available!');
       }else{
           Alertify.error('Something went wrong!');
       }
    }
    render() {
        Moment.locale('en');
        return (
            <AUX>
                {/*Start Edit*/}
                {
                    this.state.js_data.map((data, key) => {
                        return (

                            <ModalBody className="ViewPrintingJob">
                                <Form method="POST" onSubmit= {(e) => this.updateDeliverBtn(e)}>
                                <table id="first_table" className="table table-bordered mb-0 first_table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Label>P.O. Date:</Label>
                                                <p> {Moment(data.date_added).format('YYYY-MM-DD')}</p>
                                            </td>
                                            <td>
                                                <Label>P.O. #:</Label>
                                                <p> {data.fk_sales_order_id}</p>
                                            </td>
                                            <td>
                                                <Label>JS #:</Label>
                                                <p>{data.job_sheet_id}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table id="second_table" className="table table-bordered mb-0 second_table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Label>Customer:</Label>
                                                <p> {data.company}</p>
                                            </td>
                                            <td>
                                                <Label>Work Order #</Label>
                                                <p> {data.fk_sales_order_id}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Ship To:</Label>
                                                <p>{data.ship_to}</p>
                                            </td>
                                            <td>
                                                <Label>Batchcode:</Label>
                                                <p>{data.batch_code}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan='2'>
                                                <Label>Variant Description:</Label>
                                                <p>{data.variant_description}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Target Delivery Qty:</Label>
                                                <p> {data.quantity}</p>
                                            </td>
                                            <td >
                                                <Label>Complete Order By:</Label>
                                                <p> {Moment(data.date_added).format('YYYY-MM-DD')}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colSpan="2"><h5>{data.department == 0? 'Print Production' : 'Tube Production'}</h5></th>
                                        </tr>

                                        {
                                            this.state.department_data.map((datas, keys) => {
                                                return (
                                                    <tr>
                                                        <td id="production_tr_div" colspan="100%">
                                                            {data.department == 0?
                                                                <div className="production_div">
                                                                    <tr>
                                                                        <td>
                                                                            <Label>Laminate:</Label>
                                                                            <p> {datas.material_name}</p>
                                                                        </td>
                                                                        <td >
                                                                            <Label>Laminate Thickness:</Label>
                                                                            <p> {datas.laminate_thickness}</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <Label>Laminate Width:</Label>
                                                                            <p> {datas.laminate_width}</p>
                                                                        </td>
                                                                        <td >
                                                                            <Label>Max Approved Laminate Withdrawal:</Label>
                                                                            <p> {datas.max_approved_laminate_with}</p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td colSpan="2">
                                                                            <Label>Laminate Color:</Label>
                                                                            <p> {datas.laminate_color}</p>
                                                                        </td>
                                                                    </tr>
                                                                </div>
                                                            :
                                                                <div className="production_div">
                                                                    <tr>
                                                                        <td>
                                                                            <Label>Cap Type:</Label>
                                                                            <p> {datas.material_name}</p>
                                                                        </td>
                                                                        <td >
                                                                            <Label>Tube Diameter:</Label>
                                                                            <p> {datas.tube_diameter}</p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td>
                                                                            <Label>Tube Length:</Label>
                                                                            <p> {datas.tube_length}</p>
                                                                        </td>
                                                                        <td >
                                                                            <Label>Seal:</Label>
                                                                            <p> {datas.seal}</p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td>
                                                                            <Label>Resin Type:</Label>
                                                                            <p> {datas.resin_type}</p>
                                                                        </td>
                                                                        <td >
                                                                            <Label>Max Approved Cap Withdrawal:</Label>
                                                                            <p> {datas.max_approved_cap_with}</p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td colSpan="2">
                                                                            <Label>Thread Type:</Label>
                                                                            <p> {datas.laminate_color}</p>
                                                                        </td>
                                                                    </tr>

                                                                </div>
                                                            }
                                                        </td>

                                                    </tr>


                                                )

                                            })
                                        }
                                        {/*Logistic*/}
                                        <tr>
                                            <th colSpan="2"><h5>Logistic</h5></th>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Packaging Box Size:</Label>
                                                <Input name="packaging_box_size" type="number" required/>
                                            </td>
                                            <td >
                                                <Label>Max Approved Box Withdrawal:</Label>
                                                <Input name="max_approve_box_with" required/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Quantity per Box:</Label>
                                                <Input name="qty_per_box" type="number" required/>
                                            </td>
                                            <td >
                                                <Label>Boxes to Deliver:</Label>
                                                <Input name="boxes_to_deliver" type="number" required/>
                                            </td>
                                        </tr>
                                        {/* Logistic*/}

                                        <tr>
                                            <td>
                                                <Label>Released By:</Label>
                                                <p>{data.released_by}</p>
                                            </td>
                                            <td >
                                                <Label>Q.A.Leader:</Label>
                                                <p>{data.qa_leader}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Issue Date:</Label>
                                                <p>{Moment(data.issue_date).format('YYYY-MM-DD')}</p>

                                            </td>
                                            <td >
                                                <Label>Production Leader:</Label>
                                                <p>{data.production_leader}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Materials Check by:</Label>
                                                <p>{data.materials_checked_by}</p>
                                            </td>
                                            <td >
                                                <Label>Toolings Checked By:</Label>
                                                <p>{data.toolings_checked_by}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Label>Remarks:</Label>
                                                <p>{data.remarks}</p>
                                            </td>
                                            <td >
                                                <Label>NO UNDERRUN;</Label>
                                                <p>{data.no_underrun}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <ModalFooter>
                                     <Button type="button" color="primary" className="btn btn-secondary waves-effect" onClick={this.props.toggleDel}>Cancel</Button>
                                     <Button type="submit" color="success" className="btn btn-secondary waves-effect">OK</Button>
                                </ModalFooter>
                            </Form>
                        </ModalBody>
                        )
                    })
                }
                {/*End Edit*/}
            </AUX>
        )
    }

}

export default UpdateJobSheet;

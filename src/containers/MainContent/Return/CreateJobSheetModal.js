import React, { Component } from "react";
import AUX from '../../../hoc/Aux_';
import { Row, Col, Label, ModalBody,ModalFooter, Modal, ModalHeader, Input, Button, Form } from 'reactstrap';
import Config from "../../../config/Config";
import axios from "axios";
import Moment from 'moment';
import Listprint from "./GetMaterials";
import ListJO from "./GetJobOrder";
import Listprod from "./GetMaterialsProd";
import ListWork from "./GetReturnWorkOrder";
import { connect } from 'react-redux';
import Alertify from 'alertifyjs';
import $ from 'jquery';

const initalState = {
    addMore : {
		form:[
			[{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]
		]
	},
    addMoreTube : {
		form:[
			[{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]
		]
	},
    js_data: [],
}

class CreateJobSheetModal extends Component {
    constructor(props) {
        super(props);
        this.state = initalState;

    }

     submit = async (e,id) => {
        e.preventDefault();
        let jo_id = id;
        let url = Config.base_url + 'returnapi/submitJobSheet';
        let formdata = new FormData(e.target);
        formdata.append('so_id' ,jo_id );
        formdata.append('quantity' ,this.props.return_create_js_data[0].quantity );
        let response = await axios.post(url , formdata);
        if (response.data.status == 'success') {
            Alertify.success(response.data.msg);
            this.props.set_toggle_modal('return_createJSModal');
            this.props.refresh(this.props.return_job_sheet_id)
        }else{
            Alertify.error(response.data.msg);
        }
    }


    onClick = async () =>{
        this.props.set_toggle_modal('return_print_production_fields')
    }
    onClick2 = async () =>{
        this.props.set_toggle_modal('return_table_production_fields')
    }
    onClick3 = async () =>{
        this.props.set_toggle_modal('return_logistic_fields')
    }

    handleChange = (e) => {
        var value = e.target.value;

        this.props.handle_changes('return_print_production_fields',false);
        this.props.handle_changes('return_table_production_fields',false);
        this.props.handle_changes('return_logistic_fields',false);

        if(value == 'printingAndProduction'){
            this.props.handle_changes('return_print_production_fields',true);
            this.props.handle_changes('return_table_production_fields',true);
        }else if (value == 'printing') {
            this.props.handle_changes('return_print_production_fields',true);
        }else if (value == 'production') {
            this.props.handle_changes('return_table_production_fields',true)
        }

    }

    quantityChange = (e) => {
        var value = e.target.value;

        this.props.handle_changes('return_quantity',value);
    }

    Splice = (parent_index) => {
        const { addMore  } = this.state;
        addMore.form.splice(parent_index , 1);
        this.setState({addMore});
        this.props.RemoveDataByIdx(parent_index);
    }
    Splice2 = (parent_index) => {
        const { addMoreTube  } = this.state;
        addMoreTube.form.splice(parent_index , 1);
        this.setState({addMoreTube});
        this.props.RemoveDataByIdx(parent_index);
    }
    AddMore = (index) => {
        const {addMore , addMoreTube} = this.state;
        if(index == 1){
            addMore.form.push([{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]);
        }else{
            addMoreTube.form.push([{'substrate' : '' , 'cap' : '' , 'quantity' : '' , 'topSeal' : ''}]);
        }
        this.setState({addMore});
    }

    Change = async () => {
        let jo_id = this.props.return_job_order_id;
        let url = Config.base_url + 'returnapi/getJobOrder';
        let formdata = new FormData();
        formdata.append('so_id' ,jo_id );
        let response = await axios.post(url , formdata);
        let datas = response.data.list;
        let jobsheet_id = response.data.job_sheet_id;
        this.props.handle_changes('return_create_js_data',datas[0]);
        this.props.handle_changes('return_js_last_id',jobsheet_id[0]['job_sheet_id']);

        let id = datas[0]['sales_id'];
        if(id){
            let urls = Config.base_url+'warehouse/returnviewWorkOrder/'+id;
            let responses = await axios.get(urls);
            this.props.handle_changes('return_jobsheet_work_data',responses.data);
        }
    }



    render() {
        Moment.locale('en');
        let create_js_data = [];
        let last_id = [];
        let cjs = [];
        if(this.props.return_create_js_data.length > 0 || this.props.return_js_last_id.length > 0){
            create_js_data = this.props.return_create_js_data;

            last_id = this.props.return_js_last_id;
            let js_number = 0;
            if(last_id != ''){

                js_number = parseInt(last_id)+1;
            }


             cjs = {
                date: Moment(create_js_data['dispatch_date']).format('MMMM DD YYYY'),
                po: 'JOID'+create_js_data['sales_id'],
                sales_id:create_js_data['sales_id'],
                js: 'JSID'+js_number,
                company: create_js_data['company'],
                quantity: create_js_data['quantity'],
            }
        }
        return (
            <AUX>
                {/*Start Edit*/}
                <Modal size="lg" isOpen={this.props.return_createJSModal} toggle={() => this.props.set_toggle_modal('return_createJSModal')} className="">
                    <ModalHeader toggle={() => this.props.set_toggle_modal('return_createJSModal')}>Create Jobsheet</ModalHeader>
                        <ModalBody className="ViewPrintingJob">
                            <Form method="POST" onSubmit= {(e) => this.submit(e , cjs.sales_id)}>
                            <table id="first_table" className="table table-bordered mb-0 first_table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Label>P.O. #:</Label>
                                            <ListJO js_id={this.props.return_get_job_order} change = {() => this.Change()}/>
                                        </td>
                                        <td>
                                            <Label>P.O. Date:</Label>
                                            <Input name="po_date" value={cjs.date} readOnly/>
                                        </td>
                                        <td>
                                            <Label>JS #:</Label>
                                            <Input name="js_number" value={cjs.js} readOnly/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table id="second_table" className="table table-bordered mb-0 second_table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Label>Customer:</Label>
                                            <Input name="customer" value={cjs.company} readOnly/>
                                        </td>
                                        <td>
                                            <Label>Work Order #</Label>
                                            <ListWork/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Ship To:</Label>
                                            <Input name="ship_to" required/>
                                        </td>
                                        <td>
                                            <Label>Batchcode:</Label>
                                            <Input name="batchcode" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Variant Description:</Label>
                                            <Input name="var_des" required/>
                                        </td>
                                        <td>
                                            <Label>Number of Products to Complete:</Label>
                                            <Input type="number" name="num_of_prod_to_complete" onChange={this.quantityChange} required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colspan="2">
                                            <Label>Department:</Label>
                                            <Input type="select" name="department_type" onChange = {this.handleChange} required>
                                                <option value="" selected hidden>-Select-</option>
                                                <option value="printing">Printing</option>
                                                <option value="production">Production</option>
                                            </Input>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Target Delivery Qty:</Label>
                                            <Input name="target_del_qty" required/>
                                        </td>
                                        <td >
                                            <Label>Complete Order By:</Label>
                                            <Input name="com_order_by" required/>
                                        </td>
                                    </tr>

                                    {/* Print Production*/}
                                    <tr className="print_production_trigger"  style={{display:this.props.return_print_production_fields ? 'table-row':'none'}}>
                                        <th colSpan="2"><h5>Print Production</h5></th>
                                    </tr>
                                    {this.state.addMore.form.map((val , idx) => {
                                        return(
                                            <tr  style={{ display:this.props.return_print_production_fields ? 'table-row':'none'}}>
                                                <td id="production_tr_div" colspan="100%">
                                                    <div className="production_div">
                                                        <Label className="close_production_btn">
                                                            {(idx > 0) ? <button onClick={() => this.Splice(idx)} type="button" className="productionClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
                                                        </Label>
                                                        <tr className="print_production_fields production_tr" style={{ display:this.props.return_print_production_fields ? 'table-row':'none'}}>
                                                            <td>
                                                                <Label>Laminate:</Label>
                                                                <Listprint js_id={this.props.return_job_sheet_id}/>
                                                            </td>
                                                            <td >
                                                                <Label>Laminate Thickness:</Label>
                                                                <Input name="laminate_thickness[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields production_tr" style={{display:this.props.return_print_production_fields ? 'table-row':'none'}}>
                                                            <td>
                                                                <Label>Laminate Width:</Label>
                                                                <Input name="laminate_width[]" type="number"/>
                                                            </td>
                                                            <td >
                                                                <Label>Max Approved Laminate Withdrawal:</Label>
                                                                <Input type="number" name="max_approve_laminate_with[]" min={this.props.return_quantity}/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields last_tr" style={{display:this.props.return_print_production_fields ? 'table-row':'none'}}>
                                                            <td colSpan="2">
                                                                <Label>Laminate Color:</Label>
                                                                <Input name="laminate_color[]"/>
                                                            </td>
                                                        </tr>

                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })
                                    }
                                    <tr  className="print_production_fields" style={{display:this.props.return_print_production_fields ? 'table-row':'none'}}>
                                        <td colSpan="2">
                                            <Row className="pluscont addMoreBtnJS">
                                                <Col md={12} className={'addMore'}>
                                                    <Button title="Add more" type="button" color="primary" className=" btn btn-secondary" onClick = {() => this.AddMore(1)}>
                                                        <i className="fas fa-plus"></i> Add More
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    {/* Print Production*/}

                                    <tr className="print_production_trigger"  style={{ display:this.props.return_table_production_fields ? 'table-row':'none'}}>
                                        <th colSpan="2"><h5>Tube Production</h5></th>
                                    </tr>
                                    {/*Table Production*/}
                                    {this.state.addMoreTube.form.map((val , idx) => {
                                        return(
                                            <tr >
                                                <td id="production_tr_div" colspan="100%">
                                                    <div className="production_div">
                                                        <Label className="close_production_btn">
                                                            {(idx > 0) ? <button onClick={() => this.Splice2(idx)} type="button" class="productionClosebtn" aria-label="Close"><span aria-hidden="true">×</span></button> : null}
                                                        </Label>
                                                        <tr className="print_production_fields production_tr" style={{ display:this.props.return_table_production_fields ? 'table-row':'none'}}>
                                                            <td>
                                                                <Label>Cap Type:</Label>
                                                                <Listprod />
                                                            </td>
                                                            <td >
                                                                <Label>Tube Diameter:</Label>
                                                                <Input name="tube_diameter[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields production_tr" style={{display:this.props.return_table_production_fields ? 'table-row':'none'}}>
                                                            <td>
                                                                <Label>Tube Length:</Label>
                                                                <Input name="tube_length[]" type="number"/>
                                                            </td>
                                                            <td >
                                                                <Label>Seal:</Label>
                                                                <Input name="seal[]"/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields production_tr" style={{display:this.props.return_table_production_fields ? 'table-row':'none'}}>
                                                            <td>
                                                                <Label>Resin Type:</Label>
                                                                <Input name="resin_type[]"/>
                                                            </td>
                                                            <td >
                                                                <Label>Max Approved Cap Withdrawal:</Label>
                                                                <Input type="number" name="max_approve_cap_with[]" min={this.props.return_quantity}/>
                                                            </td>
                                                        </tr>

                                                        <tr className="print_production_fields last_tr" style={{display:this.props.return_table_production_fields ? 'table-row':'none'}}>
                                                            <td colSpan="2">
                                                                <Label>Thread Type:</Label>
                                                                <Input name="thread_type[]"/>
                                                            </td>
                                                        </tr>

                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })
                                    }
                                    <tr  className="print_production_fields" style={{display:this.props.return_table_production_fields ? 'table-row':'none'}}>
                                        <td colSpan="2">
                                            <Row className="pluscont addMoreBtnJS">
                                                <Col md={12} className={'addMore'}>
                                                    <Button title="Add more" type="button" color="primary" className=" btn btn-secondary" onClick = {() => this.AddMore(2)}>
                                                        <i className="fas fa-plus"></i> Add More
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>

                                    {/* Table Production*/}

                                    <tr>
                                        <td>
                                            <Label>Released By:</Label>
                                            <Input name="released_by" required/>
                                        </td>
                                        <td >
                                            <Label>Q.A.Leader:</Label>
                                            <Input name="qa_leader" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Issue Date:</Label>
                                            <Input name="issue_date" value={Moment().format('MMMM DD YYYY')}required/>

                                        </td>
                                        <td >
                                            <Label>Production Leader:</Label>
                                            <Input name="prod_leader" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Materials Check by:</Label>
                                            <Input name="mat_check_by" required/>
                                        </td>
                                        <td >
                                            <Label>Toolings Checked By:</Label>
                                            <Input name="toolings_checked_by" required/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label>Remarks:</Label>
                                            <Input name="remarks" required/>
                                        </td>
                                        <td >
                                            <Label>NO UNDERRUN;</Label>
                                            <Input name="no_underrun" required/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                                <ModalFooter>
                                    <Button color="secondary" className="btn btn-secondary waves-effect" onClick={() => this.props.toggle()}>Cancel</Button>{' '}
                                    <Button type="submit" color="primary" className="btn btn-secondary waves-effect">Submit</Button>
                                </ModalFooter>
                            </Form>
                    </ModalBody>
                </Modal>
                {/*End Edit*/}
            </AUX>
        )
    }

}
const mapStateToProps = state => {
    return {
        return_createJSModal: state.returnReducer.return_createJSModal,
        return_create_js_data: state.returnReducer.return_create_js_data,
        return_js_last_id: state.returnReducer.return_js_last_id,
        return_job_sheet_id: state.returnReducer.return_job_sheet_id,
        return_get_job_order: state.returnReducer.return_get_job_order,
        return_job_order_id: state.returnReducer.return_job_order_id,
        return_jobsheet_work_data: state.returnReducer.return_jobsheet_work_data,
        return_print_production_fields: state.returnReducer.return_print_production_fields,
        return_table_production_fields: state.returnReducer.return_table_production_fields,
        return_logistic_fields: state.returnReducer.return_logistic_fields,
        return_quantity: state.returnReducer.return_quantity,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL' ,state: state}),
        RemoveDataByIdx : (idx) => dispatch({type : 'RemoveDataByIdx' , idx : idx}),
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(CreateJobSheetModal);

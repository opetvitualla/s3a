import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import axios from 'axios';
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import SimpleReactValidator from 'simple-react-validator';
import { MDBDataTable } from 'mdbreact';
import { Row,Col,Modal, ModalHeader, ModalBody, Button, ModalFooter, } from 'reactstrap';
import { ProgressBar  } from 'react-bootstrap';
import { connect } from 'react-redux';
import CreateJobSheetModal from './CreateJobSheetModal';
import GroupButton from '../../CustomComponents/GroupButton';
import UpdateJobSheet from './UpdateJobSheet';


class Return extends Component {

    constructor(props) {
        super(props);
        Alertify.defaults = Config.AlertConfig
        this.validator = new SimpleReactValidator();
        this.state = {
            salesData: '',
            modalOpenDeliver: false,
            workInProgress: 0,
            completed: 0,
            delivered: 0,
            job: '',
            js_id:'',
        }
    }

    CreateSalesOrder = async (e) => {
        e.preventDefault();
    }

    createJobSheetNow = async (e) =>{
        if(this.props.return_job_sheet_id){
            let id = this.props.return_job_sheet_id;
            let url = Config.base_url + 'warehouse/getJobOrderData/' + id,
            response = await axios.get(url);

            this.props.handle_changes('return_create_js_data',response.data.create_js_data);
            this.props.handle_changes('return_js_last_id',response.data.last_data);
        }
        this.props.set_toggle_modal('return_createJSModal');
    }
    componentDidMount() {
        this.displayJobSheetData();
    }

    updateDeliverBtn = async() => {
        let response;
        let id = this.state.id
        const {workInProgress, completed,delivered, job }      = this.state;
        let url = Config.base_url + 'warehouse/updateDelivery/'+id;
        const formData  = new FormData();

        formData.append('workInProgress' , workInProgress);
        formData.append('delivered' , delivered);
        formData.append('completed' , completed);
        formData.append('job' , job);

        response = await axios.post(url, formData);


        if (response.data) {
           Alertify.success('Successfully Approved!');
           this.setState({modalOpenDeliver: false});
           this.props.refresh(this.props.return_job_sheet_id);
       }else if(response.data == 0){
           Alertify.error('Stocks not available!');
       }else{
           Alertify.error('Something went wrong!');
       }
    }


    modalOpen = async (id,workInProgress,completed,delivered,job) => {
			this.setState({
				modalOpenDeliver : !this.state.modalOpenDeliver,
	  		  	id:id,
                workInProgress: workInProgress,
                completed: completed,
                delivered: delivered,
                job: job,
                js_id: id,
			})

            let updatejob = {
            'workInProgress': workInProgress,
            'completed'      : completed,
            'delivered'      : delivered,
            'job'            : job,}

            console.log(id)
            this.props.handle_changes('return_updatejob',updatejob);
	}
    toggleDel = () =>{
	   this.setState({
		  modalOpenDeliver : !this.state.modalOpenDeliver,
	   })
	 }

     displayJobSheetData = async (e) =>{
         let url = Config.base_url + 'returnapi/GetJobSheet',
         response = await axios.get(url);
         this.props.handle_changes('return_job_order_job_sheet_data',response.data);
     }

    render() {
        let temp_data =[];
        let salesData = '';
        let job_name_title = '';
        const { return_job_order_job_sheet_data } = this.props;
        if (return_job_order_job_sheet_data.length) {
            const m = return_job_order_job_sheet_data.map((key, idx) => {
                let status = '';
                job_name_title = key.job_order_name;
                switch (key.printing_dep_status) {

                    case '1':
                        status = 'In-Progress';
                       break;
                    case '2':
                        status = 'On-hold';
                       break;
                    case '3':
                        status = 'Off-track';
                       break;
                    case '4':
                        status = 'Completed';
                       break;

                    default:
                        status = 'Pending';
                       break;
                 }


                let percent = 0;
                let completed = '';
                let delivered = '';
                let num_to_complete = '';
                let work_in_prog = '';
                let total = 0;
                if(key.department == 0){
                    completed = key.dep_completed_qty ? key.dep_completed_qty : '0';
                    num_to_complete = key.from_return == '1' ? key.num_of_prod_to_complete : key.max_approved_laminate_with;
                    delivered = key.dep_delivered_qty ? key.dep_delivered_qty : '0';
                    total = parseInt(completed) + parseInt(delivered);
                    work_in_prog = parseInt(num_to_complete - total);
                     if(total != 0 && key.max_approved_laminate_with != 0){
                        percent = ((parseInt(total) / parseInt(num_to_complete)) * 100);
                    }

                }else{
                    completed = key.prod_completed_qty ? key.prod_completed_qty : '0';
                    num_to_complete =  key.from_return == '1' ? key.num_of_prod_to_complete : key.max_approved_cap_with;
                    delivered = key.prod_delivered_qty ? key.prod_delivered_qty : '0';
                    total = parseInt(completed) + parseInt(delivered);
                    work_in_prog = parseInt(num_to_complete - total);
                    // console.log('max approved:'+key.max_approved_cap_with);
                    // console.log('total:'+total);
                     if(total != 0 && key.max_approved_cap_with != 0){
                        percent = ((parseInt(total) / parseInt(num_to_complete)) * 100);
                    }
                }
                let x = {
                    jobSheetID: "JSID" + key.job_sheet_id.padStart(5, "0"),
                    jobName: key.job,
                    com_per:   <ProgressBar now={percent.toFixed(2)} label={`${percent.toFixed(2)}%`} /> ,
                    total_com:  total,
                    work_in_prog: work_in_prog,
                    for_del:   completed != 0 ? <button className="btn btn-success" onClick={() => this.modalOpen(key.job_sheet_id,work_in_prog,completed,delivered,key.job)} type="button">{completed} - Deliver Now</button> : 0,
                    del: delivered,
                    num_com:  num_to_complete,
                    status: status
                }
                temp_data.push(x);
            });
            salesData =  temp_data ;
        }
        const data = {
            columns: [
                { label: 'Job Sheet ID', field: 'jobSheetID', width: 150 },
                { label: 'Job', field: 'jobName', width: 150 },
                { label: 'Completed Percentage', field: 'com_per', width: 200 },
                { label: 'Total Completed', field: 'total_com', width: 200 },
                { label: 'Work in Progress', field: 'work_in_prog', width: 200 },
                { label: 'For Delivery', field: 'for_del', width: 200 },
                { label: 'Delivered', field: 'del', width: 200 },
                { label: 'To Complete', field: 'num_com', width: 200 },
                { label: 'Status', field: 'status', width: 200 },
            ],
            rows: salesData
        };
        return (
            <AUX>
                <CreateJobSheetModal refresh={() => this.displayJobSheetData()}/>

                <div className="row">
					<div className="col-sm-12">
						<div className="page-title-box">
							<h4 className="page-title">Return</h4>
							<ol className="breadcrumb">
								<li className="breadcrumb-item active">
									Jobsheets for Return are listed here
								</li>
							</ol>
						</div>
					</div>
				</div>
                <Row>

                    <Col sm={12}>

                        <div className="card m-b-20">
                            <div className="card-body ">
                                <Row className="create_js_table">
                                    <Col sm={12}>
                                        <button type="button" className="float-right btn btn-info real-btn btn btn-secondary" onClick={this.createJobSheetNow} name="fromDate">Create</button>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                <MDBDataTable
                                    responsive
                                    bordered
                                    hover
                                    data={data}
                                    className='job_sheet_details_modal'
                                />
                            </div>
                        </div>
                    </Col>
                </Row>



                <Modal size="lg" isOpen={this.state.modalOpenDeliver} toggle={this.toggleDel}>
                  <ModalHeader toggle={this.toggleDel}>Deliver</ModalHeader>
                   <UpdateJobSheet js_id={this.state.js_id} updatejob={this.props.return_updatejob} refresh={() => this.displayJobSheetData()} toggleDel={this.toggleDel}/>
                </Modal>

            </AUX>

        )
    }
}
const mapStateToProps = state => {
    return {
        return_createJSModal: state.returnReducer.return_createJSModal,
        return_job_order_job_sheet_data: state.returnReducer.return_job_order_job_sheet_data,
        return_create_js_data: state.returnReducer.return_create_js_data,
        return_js_last_id: state.returnReducer.return_js_last_id,
        return_job_sheet_id: state.returnReducer.return_job_sheet_id,
        return_updatejob: state.returnReducer.return_updatejob,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL' ,state: state}),
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(Return);

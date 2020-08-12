import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import GroupButton from '../../CustomComponents/GroupButton';
import { BallBeat } from 'react-pure-loaders';
import {  Modal, ModalHeader,Col} from 'reactstrap';
import { MDBDataTable,} from 'mdbreact';
import Config from '../../../config/Config';
import Alertify from 'alertifyjs';
import { ProgressBar  } from 'react-bootstrap';
import ViewJobsheet from './ViewJobsheet';
import axios from 'axios';
import RequestModal from './RequestModal';
import OpenCompleted from './OpenCompleted';


class JobOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            job_sheet_data: [],
            modalOpen: false,
            js_id: '',
            requestModal: false,
            OpenCompleted: false,
            printing_dep_status:0,
        }

    }

    mods = (isOpen) => {
        return <RequestModal isOpen={isOpen} />;
    }

    componentDidMount() {
        this.GetJobSheet();
        Alertify.defaults = Config.AlertConfig
    }

    toggleModal = (id = '') => {
        this.setState({
            js_id: id,
            modalOpen: !this.state.modalOpen
        })
    }

    requestForm = (id = '') => {
        this.setState({
            js_id: id,
            requestModal: !this.state.requestModal
        });
    }
    approveJS = async (id) => {
        let response;
        let url = Config.base_url + 'printingdepartment/updateJobSheet/' + id;
        Alertify.confirm('Are you sure?', () => {
            response = axios.post(url)
            Alertify.success('Successfully Updated Status!')
            this.GetJobSheet();
        });

    }

    OpenCompleted = async (id, job_status) => {
        this.setState({
            js_id: id,
            printing_dep_status:job_status,
            OpenCompleted: !this.state.OpenCompleted
        });

    }

    GetJobSheet = async (e) => {
        let response;
        let temp_data = [];
        let url = Config.base_url + 'printingdepartment/GetJobSheet';
        response = await axios.post(url, '');

        if (response.data.msg == 'success') {
            const m = response.data.result.map((key) => {
                let groupBtn = [
                    { title:  (key.printing_dep_status != '0') ? "Finished Items":"Update to In-progress", icon: (key.printing_dep_status != '0') ? "ion-ios7-paper-outline" : "ion-checkmark", color: "success", function: (key.printing_dep_status != '0') ? () => this.OpenCompleted(key.job_sheet_id, key.printing_dep_status) : () => this.approveJS(key.job_sheet_id) },
                    { title: "View", icon: "ion-eye", color: "info", function: () => this.toggleModal(key.job_sheet_id) },
                    { title: "Request Material", icon: "ion-plus", color: "warning", function: () => this.requestForm(key.job_sheet_id) },
                ];
                let status = '';
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

                 let completed = 0;
                 let num_to_complete = key.from_return == '1' ? key.num_of_prod_to_complete : key.quantity;
                 if(key.completed_qty != null){
                     completed = key.completed_qty;
                 }
                 let percent = 0;
                 if(completed != 0 && key.quantity != 0){
                    percent = ((key.completed_qty / num_to_complete) * 100);
                }

                let x = {
                    js_no: key.job_sheet_id,
                    js_name: key.job,
                    dispath_date: key.dispatch_date,
                    no_to_complete:  num_to_complete,
                    no_completed: key.completed_qty ? key.completed_qty : '0',
                    completed_per: <ProgressBar now={percent.toFixed(2)} label={`${percent.toFixed(2)}%`} />,
                    status: status,
                    action: <GroupButton data={groupBtn} />,

                }
                temp_data.push(x);
            });
            this.setState({ job_sheet_data: temp_data, loading: false,  })
        }
    }

    render() {

        const data = {
            columns: [
                { label: 'JO #', field: 'js_no', sort: 'asc', width: 150 },
                { label: 'Job', field: 'js_name', sort: 'asc', width: 150 },
                { label: 'Dispatch Date', field: 'dispath_date', sort: 'asc', width: 150 },
                { label: 'No. to Complete', field: 'no_to_complete', sort: 'asc', width: 150 },
                { label: 'No. of items Completed', field: 'no_completed', sort: 'asc', width: 150 },
                { label: 'Percentage', field: 'completed_per', sort: 'asc', width: 150 },
                { label: 'Status', field: 'in', sort: 'status', width: 150 },
                { label: 'Action', field: 'action', sort: 'action', width: 150 },
            ],
            rows: this.state.job_sheet_data
        };

        if (this.state.loading) {
            return (
                <BallBeat loading='true' color='#EB3B5A' />
            );
        } else {

            return (
                <AUX>

                    <Col md={12} className="printing-department-user card m-b-20">
                        <div className="card-body table_shift real_tbl printingDepartmentTable">

                            <MDBDataTable
                                responsive
                                bordered
                                hover
                                data={data}
                            />

                        </div>
                    </Col>

                    <Modal size="lg" isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Job Sheet</ModalHeader>
                        <ViewJobsheet js_id={this.state.js_id} />
                    </Modal>

                    <RequestModal
                        id={this.state.js_id}
                        isOpen={this.state.requestModal}
                        toggle={() => this.requestForm()}
                    />
                    <OpenCompleted
                        id={this.state.js_id}
                        isOpen={this.state.OpenCompleted}
                        job_status={this.state.printing_dep_status}
                        Job={this.state.OpenCompleted}
                        toggle={() => this.OpenCompleted()}
                        reload = {()=>this.GetJobSheet()}
                    />

                </AUX>

            )
        }
    }

}

export default JobOrder;

import React, { Component }  from "react";
import axios from "axios";
import { Input, Label } from "reactstrap";
import Config from '../../../config/Config';
import { connect } from 'react-redux';

class GetReturnWorkOrder extends Component {

    constructor(props){
        super(props);
        this.state = {
            material:[]
        }
    }

    componentDidMount(){
    }


    // GetWOrder = async () => {
        // let id = this.props.return_job_sheet_id;
        // let url = Config.base_url+'warehouse/viewWorkOrder/'+id;
        // let response = await axios.get(url);
        // const material = response.data;
        //
        // this.setState({material});
    // }

    render() {
        return (
            <>
                <Input type="select" name="workOrder">
                    {
                        this.props.return_jobsheet_work_data.map((val) => {
                            return <option value={val.id}>{val.job}</option>
                        })
                    }
                </Input>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        return_job_sheet_id: state.returnReducer.return_job_sheet_id,
        return_jobsheet_work_data: state.returnReducer.return_jobsheet_work_data,
    }
}
const mapActionToProps = dispatch => {
    return {
        handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
    }
}
export default connect(mapStateToProps, mapActionToProps)(GetReturnWorkOrder);

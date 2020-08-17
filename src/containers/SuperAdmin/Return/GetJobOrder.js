import React, { Component } from "react";
import axios from "axios";
import { Input, Label } from "reactstrap";
import Config from '../../../config/Config';
import { connect } from 'react-redux';

class List extends Component{

    constructor(props){
        super(props);
        this.state = {
            material:[]
        }
    }
    handleChange = (e) => {
        this.props.set_handle_changes('return_job_order_id',e.target.value);
        var my = this;
        setTimeout(function () {
            my.props.change();
        }, 100);

    }

    async componentDidMount(){
        let url = Config.base_url+'api/viewJobOrder';
        let response = await axios.get(url);
        const material = response.data;
        this.setState({material});
    }

    render() {
        return (
            <>
                <Input type="select" name="po_number" onChange = {this.handleChange} required>
                <option value={''}> - Select - </option>
                    {
                        this.state.material.map((val) => {
                            return <option value={val.sales_id}>{'JOID'+val.sales_id.padStart(5, "0")}</option>
                        })
                    }
                </Input>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        return_job_order_id: state.returnReducer.return_job_order_id,
    }
}
const mapActionToProps = dispatch => {
    return {
        set_handle_changes: (state, value) => dispatch({ type: 'HANDLE_CHANGE', state: state, value: value }),
        set_toggle_modal: (state) => dispatch({ type: 'TOGGLE_MODAL' ,state: state}),
        RemoveDataByIdx : (idx) => dispatch({type : 'RemoveDataByIdx' , idx : idx}),
    }
}
export default connect(mapStateToProps, mapActionToProps)(List);

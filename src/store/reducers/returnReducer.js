const initState = {
    return_get_job_order               :   [],
    return_job_order_id                :   '',
    return_create_js_data              :   [],
    return_jobsheet_work_data          :   [],
    return_job_sheet_id                :   '',
    return_js_last_id                  :   '',
    return_createJSModal               :   false,
    return_job_order_job_sheet_data    :   [],
    return_print_production_fields     :   false,
    return_table_production_fields     :   false,
    return_logistic_fields             :   false,
    return_quantity                    :   0,
    return_updatejob                   :   [],
}

const returnReducer = (state = initState, action) => {
    switch (action.type) {

        case 'TOGGLE_MODAL':
            return {
                ...state,
                [action.state]: !state[action.state]
            }
        case 'HANDLE_CHANGE':
           return {
              ...state,
              [action.state]: action.value
           }
        case 'ONCHANGE':
            let stated = action.name;
            return {
                ...state,
                stated : action.value
            }

        case 'ONCHANGE_DATE':

            let stated_date = action.name;
            let d           = new Date(action.value);
            let year        = d.getFullYear();
            let day         = d.getDay() - 1;
            let month       = d.getMonth() + 1;
            let date_ex     = year.toString()+'-'+day.toString()+'-'+month.toString();

            return {
                ...state,
                stated_date : new Date(date_ex)
            }

        default:
            return state;
    }
}
export default returnReducer;

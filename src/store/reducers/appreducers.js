const initState = {
    isModalOpen:false,
    js_id : '',
    isEditable : false,
    num_edit : '',
    log_id : null,
    job_status : false,
}

const appreducers = (state = initState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }
        case 'SET_ID':
            return {
                ...state,
                js_id: action.value_id
            }
        case 'EDIT_FINISHED':
            return {
                ...state,
                isEditable: action.value
            }
        case 'CHANGE_EDIT':
            return {
                ...state,
                num_edit: action.value
            }
        case 'LOG_ID':
            return {
                ...state,
                log_id: action.value
            }
        case 'HANDLE_CHANGE':
           return {
              ...state,
              [action.state]: action.value
           }
        default:
            return state;
    }
}

export default appreducers;

const events = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return [
                ...state,
                action.values
            ];
        case 'ADD_GUEST':
            return state.map(item => {
                if(item.id === action.id){
                    action.values.id = item.participant.length+1;
                    item.participant.push(action.values);
                    return item;
                }
                return item;
            });
        default:
            return state
    }
};

export default events
export default function(state={},action){
    switch(action.type){   
        case 'USER_AUTH':
            return {...state,login:action.payload}
        default:
            return state;
    }
}
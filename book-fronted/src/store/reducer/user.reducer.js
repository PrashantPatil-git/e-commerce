import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../type";

const userReducer = (state = {}, action) => {


    switch (action?.type) {
        case SET_CURRENT_USER:
            localStorage.setItem('loginUser', JSON.stringify(action?.payload));
            return action?.payload;

        case CLEAR_CURRENT_USER:
            console.log("user removing");
            localStorage.removeItem('loginUser');
            console.log("user removed");
            return null;
        default:
            return JSON.parse(localStorage.getItem('loginUser'));
    }


}

export default userReducer;
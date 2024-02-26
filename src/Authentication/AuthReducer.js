const initialState={
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
    user: JSON.parse(localStorage.getItem('user')) || null
}

const AuthReducer=(state=initialState,action)=>{
    switch (action.type){
        case 'LOGIN_SUCCESS': 
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(action.payload));
        return{...state,isAuthenticated:true,user:action.payload};
        case 'LOGOUT':
            localStorage.removeItem('isAuthenticated');
            return{...state,isAuthenticated:false,user:null};
        default:return{state}
    }
}

export default AuthReducer
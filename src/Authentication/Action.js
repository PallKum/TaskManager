export const loginUser=(user)=>({
    type:'LOGIN_SUCCESS',
    payload:user
})

export const logoutUser=()=>({
    type:'LOGOUT'
})
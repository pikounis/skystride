// Local
// export const APIPath = "http://localhost:8081";
// SERVER
export const APIPath = "http://35.176.106.162:8081"; 

export const getHeader = () => {
    // Get the JWT token and userId from localStorage
    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    };

    return headers;
}

export const getUserId = () => {
    return localStorage.getItem('userId');  // Retrieve userId directly from localStorage
}

export const getToken = () => {
    return localStorage.getItem('jwt');
}

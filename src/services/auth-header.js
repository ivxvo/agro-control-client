exports.authHeader = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    
    if(user && user.accessToken) {
        return { "x-access-token": user.accessToken,
        "Content-type": "application/json"
     };
    } else {
        return {};
    }
};
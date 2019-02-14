export const authenticate = (username, password) => {
    //console.log(username);
    //console.log(password);
    const URL = 'http://192.168.1.192:9001/loginServlet';
    //console.log(URL);
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'secret': 'I am the server\'s secret!'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => response.json())
        .catch(function(error) {
            console.log('Fetch operation error: ' + error.message);
            throw error;
        });
}
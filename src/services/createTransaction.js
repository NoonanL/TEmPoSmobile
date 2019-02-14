export const createTransaction = (username, customerId, productId) => {
    //console.log(username);
    //console.log(searchStr);
    const URL = 'http://192.168.1.192:9001/createTransactionServlet';
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'secret': 'I am the server\'s secret!'
        },
        body: JSON.stringify({
            requestUser: username,
            customerId: customerId,
            productId: productId
        }),
    })
        .then((response) => response.json())
        .catch(function(error) {
            console.log('Fetch operation error: ' + error.message);
            throw error;
        });
}
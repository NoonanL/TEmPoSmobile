export const searchProducts = (username, searchStr) => {
    console.log(username);
    console.log(searchStr);
    const URL = 'http://192.168.1.192:9001/searchProductsServlet';
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'secret': 'I am the server\'s secret!'
        },
        body: JSON.stringify({
            requestUser: username,
            searchString: searchStr
        }),
    })
        .then((response) => response.json())
        .catch(function(error) {
            console.log('Fetch operation error: ' + error.message);
            throw error;
        });
}
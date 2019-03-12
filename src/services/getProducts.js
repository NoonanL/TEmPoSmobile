export const getProducts = (username, address) => {
  //console.log(username);
  const URL = 'http://' + address + ':9001/getProductsServlet';
  return fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      secret: "I am the server's secret!"
    },
    body: JSON.stringify({
      requestUser: username
    })
  })
    .then(response => response.json())
    .catch(function(error) {
      console.log('Fetch operation error: ' + error.message);
      throw error;
    });
};

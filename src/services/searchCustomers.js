export const searchCustomers = (username, searchStr, address) => {
  //console.log(username);
  //console.log(searchStr);
  const URL = 'http://' + address + ':9001/searchCustomerServlet';
  return fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      secret: "I am the server's secret!"
    },
    body: JSON.stringify({
      requestUser: username,
      searchString: searchStr
    })
  })
    .then(response => response.json())
    .catch(function(error) {
      console.log('Fetch operation error: ' + error.message);
      throw error;
    });
};

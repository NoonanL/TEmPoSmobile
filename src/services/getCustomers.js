export const getCustomers = (username) => {
	console.log(username);
	const URL = 'http://192.168.1.100:9001/getCustomersServlet';
	return fetch(URL, {
		method: 'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			requestUser: username
		}),
	})
	.then((response) => response.json())
	.catch(function(error){
		console.log('Fetch operation error: ' + error.message);
		throw error;
	});
}
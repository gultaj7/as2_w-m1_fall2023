document.addEventListener('DOMContentLoaded', function () {

const URL = 'https://dummyjson.com/products'

fetch(URL)
    .then(res => {
        if (res.ok) {
            console.log("fetching data is successful")
        } else {
            throw new Error(`Failed to receive a valid network response ${res.statusText}`);
        }
    return res.json()
    })
    .then(data => {
            if (data && typeof data === 'object') {
                console.log(data);
            } else {
                console.error('Invalid data format: Expected an object of products, received:', data);
            }
    })
    .catch(error => {
        console.error(error.message);
      })

    })
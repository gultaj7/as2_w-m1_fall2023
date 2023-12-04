document.addEventListener('DOMContentLoaded', function () {

const URL = 'https://dummyjson.com/products'
const container = document.getElementById('productContainer');

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
        if (data && Array.isArray(data.products)) {
            displayProducts(data.products);
        }
         else {
                console.error('Invalid data format');
            }
    })
    .catch(error => {
        console.error(error.message);
      })

    })
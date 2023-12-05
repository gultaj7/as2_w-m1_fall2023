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
            renderProductItems(data.products);
        }
         else {
                console.error('Invalid data format');
            }
    })
    .catch(error => {
        console.error(error.message);
      })

      const renderProductItems = (products) => {
        productContainer.innerHTML = '';
    
        if (products.length === 0) {
            productContainer.innerHTML = '<p>No matching products found.</p>';
        } else {
          products.forEach(product => {
            const productDiv = document.createElement('div');
            // productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <h2>${product.title}</h2>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}">
            `;
            productContainer.appendChild(productDiv);
          });
        }
      };

    })
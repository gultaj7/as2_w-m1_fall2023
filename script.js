document.addEventListener('DOMContentLoaded', function () {

  const URL = 'https://dummyjson.com/products'
  const container = document.getElementById('productContainer');
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');
  let productsData = []; 

  const showFilteredProducts = () => {
    const searchTerm = search.value.toLowerCase().trim();
    const selectedCategory = filter.value.toLowerCase().trim();
    
    const filteredProducts = productsData.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.category.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === '' || product.category.toLowerCase() === selectedCategory;
    
      return matchesSearch && matchesCategory;
    });
    
    renderProductItems(filteredProducts);
  };
  
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
          productsData = data.products;
          renderProductItems(productsData);
      
          const uniqueCategories = [...new Set(productsData.map(product => product.category))];
          
          filter.innerHTML = '<option value="">All Categories</option>';
      
          uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.textContent = category;
            filter.appendChild(option);
          });
      
          search.addEventListener('input', showFilteredProducts);
          filter.addEventListener('change', showFilteredProducts);
      
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
                  <img src="${product.thumbnail}" alt="${product.title}"><br> 
                  <button class="view-details" data-id="${product.id}">View Details</button>
             
              `;
              productContainer.appendChild(productDiv);
            });
          }
        };
  
        productContainer.addEventListener('click', (event) => {
          const clickedElement = event.target;
          if (clickedElement.classList.contains('view-details')) {
              const productId = clickedElement.getAttribute('data-id');
              goToProductDetail(productId);
          }
      });
      
      function goToProductDetail(productId) {
        window.location.href = `productDetail.html?id=${productId}`;
      }
      })
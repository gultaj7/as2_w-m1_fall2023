const URL = 'https://dummyjson.com/products'

fetch(URL)
    .then(res => {
        if (res.ok) {
            console.log("success")
        } else {
            throw new Error(`Failed to receive a valid network response ${res.statusText}`);
        }
    return res.json()
    })
    .then(data => console.log(data))
    .catch(error => {
        console.error(error.message);
      })
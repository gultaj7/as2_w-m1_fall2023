fetch('https://dummyjson.com/products')
    .then(res => {
        if (res.ok) {
            console.log("success")
        } else {
            console.log("not successful")
        }
    return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log('error'))

    

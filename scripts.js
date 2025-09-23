if (window.prompt("Enter the password") === "pass") {
    populateProducts();
    document.querySelector('body').style.display = "block";
}

function createTable(products) {
    products.forEach(product => {
        createProduct(product);
    })
}

function createProduct(product) {
    const tbody = document.querySelector("tbody");
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const reg = document.createElement("td");
    const docs = document.createElement("td");
    const label = document.createElement("a");
    const sds = document.createElement("a");

    name.classList.add('col1');
    name.textContent = product.productName;

    reg.textContent = product.epaRegNumber;

    label.setAttribute('href', product.documents[0].url);
    label.textContent = product.documents[0].type;

    sds.setAttribute('href', product.documents[1].url)
    sds.textContent = product.documents[1].type;

    docs.classList.add('col3');
    docs.append(label, sds);

    row.append(name, reg , docs);
    tbody.append(row);
}

async function populateProducts() {
    const path = "./products.json";
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
        const result = await response.json();
        createTable(result);
    } catch (error) {
        console.error(error.message);
    }
}


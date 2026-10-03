let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.querySelector(".total");
let totalSpan = document.querySelector(".total span");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let table = document.querySelector("table");
let tBody = document.getElementById("tbody");

let mood = "create";
let tmp;

// Get Total From Price
function totalElemetn() {
    
    let priceValue = Number(price.value);
    let discountValue = Number(discount.value);
    let taxesValue = Number(taxes.value);
    let adsValue = Number(ads.value);

    // After Discount And Taxes
    let afterDiscount = priceValue - (priceValue * discountValue / 100);
    let afterTaxes = afterDiscount + (afterDiscount * taxesValue / 100);

        // Total
        if (price.value != "") {
            totalSpan.innerHTML = afterTaxes + adsValue;
            total.style.backgroundColor = "#bd4343";
        } else {
            totalSpan.innerHTML = "";
            total.style.backgroundColor = "green";
        }
}

// Create Data In Object And LocalStorage
let dataPro = [];
// IF Data Find In LocalStorage
if (localStorage.getItem("product")) {
    dataPro = JSON.parse(localStorage.getItem("product"))
}

submit.onclick = function () {
    // Create Object
    let data = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: totalSpan.innerHTML,
        count: count.value,
        category: category.value
    }

    // Push Data In DataPro
    if (title.value != "" && price.value != "" && category.value != "" && data.count < 100) {
        if (mood === "create") {
            if (data.count > 1) {
                for (let i = 0; i < data.count; i++) {
                    dataPro.push(data);
                }
            } else {
                    dataPro.push(data);
                }
        } else {
            dataPro[tmp] = data
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block"
        }
        // Remove Input Content After Create
        clearInput()
    }
        
    // Push DataPro In LocalStorage
    window.localStorage.setItem("product", JSON.stringify(dataPro));
    
    // Show Data In Output
    showData();
}

// Remove Input Content After Create
function clearInput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    totalSpan.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Create Data In Output
function showData() {

    totalElemetn();

    let createBody = "";

    for (let i = 0; i < dataPro.length; i++) {
        createBody += `
            <tr id="tr">
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateElement(${i})" class="update" id="${i}">Update</button></td>
                <td><button class="delete" id="${i}">Delete</button></td>
            </tr>
    `
    }
    // Count Elements In Table From Delet Span 
    document.querySelector(".delete-all span").innerHTML = dataPro.length;

    tBody.innerHTML = createBody;

    deleteElement();


    deleteAll()
}
showData()
deleteElement();
// Function Delet Button From Table
function deleteElement() {
    document.querySelectorAll(".delete").forEach(del => {
        del.addEventListener("click", function () {
            deleteElementFLocal(del.id)
            showData()
        })
    })
}

// Delete Element From Table
function deleteElementFLocal(index) {

    dataPro.splice(Number(index),1);

    localStorage.setItem("product", JSON.stringify(dataPro))
    showData()
}

// Delete All Element
function deleteAll() {

    let deletAll = document.querySelector(".delete-all");
    // Sure To Table Has Elements
    if (dataPro.length > 0) {
        deletAll.style.display = "block";
    } else {
        deletAll.style.display = "none";
    }
    // Click On Delete All To Delete All Element 
    deletAll.onclick = function () {
        localStorage.clear();
        dataPro = [];
        showData()
    }
}

// Update Button
function updateElement(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    totalSpan.innerHTML = dataPro[i].total
    count.value = dataPro[i].count
    category.value = dataPro[i].category
    submit.innerHTML = "Update";
    count.style.display = "none"
    mood = "update"
    scroll({
        top: 0,
        behavior: "smooth"
    });
    tmp = i;
    totalElemetn()
}

// Search
let searchMood = "title";
function getSearchMood(id) {

    let search = document.getElementById("search");

    if (id == "search-title") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.placeholder =  "Search By" +" "+ searchMood;
    search.focus()
    search.value = "";
    showData()
}

function searchData(vlaue) {
    let createBody = '';
    
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.includes(vlaue.toLowerCase())) {
                createBody += `
                    <tr id="tr">
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateElement(${i})" class="update" id="${i}">Update</button></td>
                        <td><button class="delete" id="${i}">Delete</button></td>
                    </tr>
                `
            }
        } else {
            if (dataPro[i].category.includes(vlaue.toLowerCase())) {
                createBody += `
                    <tr id="tr">
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateElement(${i})" class="update" id="${i}">Update</button></td>
                        <td><button class="delete" id="${i}">Delete</button></td>
                    </tr>
                `
            }
        }
    }
    tBody.innerHTML = createBody;
}
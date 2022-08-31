

const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {

    const phoneDiv = document.getElementById('phone-container');
    phoneDiv.innerText = ``;

    //show all 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {

        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');

    } else {
        showAll.classList.add('d-none');
    }



    //no phone found

    const noPhone = document.getElementById('no-text-msg');

    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    //display found phones
    phones.forEach(phone => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col mt-5">
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                    </div>
            </div>
        </div>
        `;
        phoneDiv.appendChild(div);
    })
    //stop loader
    loaderSpinner(false);
}
const processSearch = (dataLimit) => {
    loaderSpinner(true);
    const searchTextElement = document.getElementById('input-field');
    const searchText = searchTextElement.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn').addEventListener('click', function () {
    //start loader
    processSearch(10);
})


//spinner function

const loaderSpinner = isLoading => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}

//not the best way to use show all button

document.getElementById('btn-show').addEventListener('click', function () {
    processSearch();
})

//show details button

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}


const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneTitle = document.getElementById('exampleModalLabel');
    phoneTitle.innerText = `${phone.name}`;
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `<p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'date not available'}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'Info not available'}</p>
    <p>Display: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'size not available'}</p>`;

}

// search input field enter button handler

document.getElementById('input-field').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        processSearch(10);
    }
})
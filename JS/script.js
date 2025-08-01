import { getAllCars } from "../JS/service.js"


let carsData = [];
const slide = document.querySelector(".swiper-wrapper");
const carsCards = document.querySelector("#carsCards");
// Maşın məlumatlarının alınması 

async function getAllCarsData(){
    carsData = await getAllCars();
    printSlides();
    printCarsCards();
};

getAllCarsData();

function printSlides() {
    if(!slide){
        console.error("swiper-wrapper elementi tapılmadı və ya boşdur", error);
        return
    };

    if(!Array.isArray(carsData) || slide.length === 0){
        console.log("Slides elementi tapılmadı və ya boşdur");
        return        
    };

    slide.innerHTML = "";

    carsData.forEach(car => {
        const slideElem = document.createElement("div");
        slideElem.className = "swiper-slide";

        if(car && car.images) {
            slideElem.innerHTML = `<img src="${car.images}" class="object-cover"  alt="${car.model}" />`
        }else {
            slideElem.innerHTML = `<div class="flex justify-center items-center text-center bg-gray-200">Şəkil tapılmadı</div>`
        }
        slide.appendChild(slideElem)
    })
};


function printCarsCards(){
    carsCards.innerHTML = "";

    carsData.forEach(car => {
    
        carsCards.innerHTML += `
                <div class="card relative shadow-lg p-3 rounded">
                    <img src="${car.images}" class="card-img-top" style="height: 300px; object-fit: cover; background-position: center; width: 100%;" alt="...">
                        <div class="text-2xl  cursor-pointer absolute top-6 right-5 text-white">
                            <i onclick="addFav('${car.id}')" class="fa-regular  fa-heart"></i>
                        </div>
                    <div class="card-body">
                        <h5 class="card-title font-bold text-[1.5rem]">${car.price} AZN</h5>
                        <p class="card-text text-lg">${car.brand} ${car.model}</p>
                        <div class="flex items-center gap-2">
                           <p class="card-text">${car.year},</p><span>${car.engine}L</span>,<span>${car.odometer}</span>${car.odometerUnit}
                        </div>
                    </div>
                </div>
        `
    });
};


function filterCars(cars) {
    carsCards.innerHTML = "";

    cars.forEach(car => {
        carsCards.innerHTML += `
                        <div class="card relative shadow-lg p-3 rounded" style="width: 18%;">
                            <img src="${car.images}" class="card-img-top" style="height: 300px; object-fit: cover; background-position: center; width: 100%;" alt="...">
                            <div class="text-xl cursor-pointer absolute top-0 right-0 text-white">
                                <i onclick="addFav('${car.id}')" class="fa-regular fa-heart"></i>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title font-bold text-[1.5rem]">${car.price} AZN</h5>
                                <p class="card-text text-lg">${car.brand} ${car.model}</p>
                                <div class="flex items-center gap-2">
                                <p class="card-text">${car.year},</p><span>${car.engine}L</span>,<span>${car.odometer}</span>${car.odometerUnit}
                                </div>
                            </div>
                        </div>
        `
    });
};


// Axtarış qutusunun seçilməsi 
 const searchInps = document.querySelectorAll("input[placeholder*='Axtardığınız maşının adını daxil edin...']");

 searchInps.forEach(input => {
    input.addEventListener("input", (e) => {
        const searchVal = e.target.value.toLowerCase();
        filterAndDisplayCars(searchVal);
    });
 });


 function filterAndDisplayCars(searchText){
    console.log("Axtarış mətni" , searchText);

    if (!Array.isArray(carsData) || carsData.length === 0) {
        console.warn("Maşın məlumatları yüklənmədi");
        return;
    };

    // Maşınları ada görə filterrləyib div - ə yığılması 

    const filteredCars = carsData
    .filter(car => {
        // Maşın brendinə və modelinə görə 

        return(
            (car.brand.toLowerCase().includes(searchText))
        );
    });

    filterCars(filteredCars)
 };

window.addFav = function(id){
    const favElem = carsData.find(car => car.id == id);
    const carsFavList = JSON.parse(localStorage.getItem("favList")) || [];
    carsFavList.push(favElem);
    localStorage.setItem("favList" , JSON.stringify(carsFavList))
};



window.goHomePage = function(){
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
};

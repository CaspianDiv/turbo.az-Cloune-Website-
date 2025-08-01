
const favSec = document.querySelector("#favSec");
const emptyFavSec = document.querySelector("#emptyFavSec");


window.mainPage = function() {
    location.href = "../index.htm";
};

function getFavList() {
    return JSON.parse(localStorage.getItem("favList")) || [];
};

function showFav() {
    emptyFavSec.innerHTML = "";
    const carFavList = getFavList();

    // Əvvəl Favorites Section boşdursa Empty  Section göstərilsin 
    if (carFavList.length === 0) {
        showEmptyFavSection();
        return;
    };


    // Favorites Section təmizlənməsi 

    favSec.innerHTML = "";

    carFavList.forEach(car => {
    favSec.innerHTML += `
        <div class="card  shadow-lg p-3 rounded" style="width: 18%;">
            <img src="${car.images}" class="card-img-top" style="height: 300px; object-fit: cover; background-position: center; width: 100%;" alt="...">
            <div class="card-body">
                <h5 class="card-title font-bold text-[1.5rem]">${car.price} AZN</h5>
                <p class="card-text text-lg">${car.brand} ${car.model}</p>
                <div class="flex items-center gap-2">
                    <p class="card-text">${car.year},</p><span>${car.engine}L</span>,<span>${car.odometer}</span>${car.odometerUnit}
                </div>
            </div>
            <div class="text-end">
                <button onclick="removeFav('${car.id}')"   class="cursor-pointer">
                    <i class="fa-solid fa-trash-can text-xl text-[#ca1016]"></i>
                </button>
            </div>
        </div>
    `
    });
};
showFav();


// Empty Sectionun göstərilmə funksiyası 
function showEmptyFavSection() {
    favSec.innerHTML = "";
    emptyFavSec.innerHTML = `
        <div>
            <img src="../img/emptyFav.png" alt="empty car image" />
        </div>
        <p class="text-xl">Bəyəndiyiniz elanları ürək işarəsinə klik edərək seçilmişlərə əlavə edin.</p> 
    `
};


window.removeFav = function(id) {
    // Mövcud Favlistin çağırılması     
    let carFavList = getFavList();

    // ID - yə görə elementin silinməsi 
    carFavList = carFavList.filter(car => car.id !== id);

    // localStorage - a yazmaq

    localStorage.setItem("favList" , JSON.stringify(carFavList));
    showFav();
}
window.goUp = function() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
};
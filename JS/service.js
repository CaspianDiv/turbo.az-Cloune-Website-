async function getAllCars(){
    try {
        const res = await fetch("https://turbo-az-data.onrender.com/cars");
        if (!res.ok) {
            throw new Error(`request xətası baş verdi məlumatları yükləyərkən, ${res.status}`)
        };
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error.message);
    }
};

export {
    getAllCars
}
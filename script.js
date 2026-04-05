// 1. CANVAS ANIMATION ENGINE
function startParticles(canvasId, fixedHeight) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = fixedHeight; 

        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 3 + 1, 
                radius: Math.random() * 3 + 1  
            });
        }
        animateCanvas();
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.y -= p.speed;
            
            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#FF0000'; 
            ctx.fill();
        }
        requestAnimationFrame(animateCanvas);
    }

    initCanvas();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
    });
}

startParticles('particleCanvas', 800);
startParticles('heroCanvas', 350);


// 2. VEHICLE DATABASE
const allVehicles = [
    { id: 1, name: "Maruti Suzuki Swift", type: "Compact", price: 1500, seats: 5, fuel: "Petrol", mileage: "22 kmpl", rating: "4.5", img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Suzuki_Swift_DZire_1.2_GL_2013_%2810861895695%29.jpg", transmission: "Manual", luggage: "2 Bags", features: "AC, Bluetooth Audio" },
    { id: 2, name: "Hyundai i20", type: "Compact", price: 1700, seats: 5, fuel: "Petrol", mileage: "20 kmpl", rating: "4.8", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/i20/11092/1755774177956/front-left-side-47.jpg", transmission: "Automatic", luggage: "2 Bags", features: "Touchscreen Display, Keyless Entry" },
    { id: 3, name: "Tata Tiago", type: "Compact", price: 1300, seats: 5, fuel: "Petrol", mileage: "23 kmpl", rating: "4.6", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Tiago/10655/1768302905210/front-left-side-47.jpg", transmission: "Manual", luggage: "1 Bag", features: "Harman Audio System, Rear Camera" },
    
    { id: 4, name: "Maruti Suzuki Dzire", type: "Sedan", price: 1800, seats: 5, fuel: "Diesel", mileage: "24 kmpl", rating: "4.7", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Dzire/12186/1771935643542/front-left-side-47.jpg", transmission: "Manual", luggage: "3 Bags", features: "Rear AC Vents, Alloy Wheels" },
    { id: 5, name: "Honda City", type: "Sedan", price: 2500, seats: 5, fuel: "Petrol", mileage: "17 kmpl", rating: "4.9", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/City/12093/1755764990493/front-left-side-47.jpg", transmission: "Automatic", luggage: "4 Bags", features: "Sunroof, Cruise Control" },
    { id: 6, name: "Hyundai Verna", type: "Sedan", price: 2600, seats: 5, fuel: "Petrol", mileage: "18 kmpl", rating: "4.8", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Verna/7729/1616055133475/front-left-side-47.jpg", transmission: "Automatic", luggage: "4 Bags", features: "Ventilated Seats, Smart Trunk" },
    
    { id: 7, name: "Hyundai Creta", type: "SUV", price: 3000, seats: 5, fuel: "Diesel", mileage: "18 kmpl", rating: "4.8", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1755765115423/front-left-side-47.jpg", transmission: "Automatic", luggage: "4 Bags", features: "Panoramic Sunroof, Bose Sound" },
    { id: 8, name: "Tata Nexon", type: "SUV", price: 2500, seats: 5, fuel: "Petrol", mileage: "17 kmpl", rating: "4.9", img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/9667/1678099574664/front-left-side-47.jpg", transmission: "Manual", luggage: "3 Bags", features: "5-Star Global NCAP, Drive Modes" },
    { id: 9, name: "Mahindra Thar", type: "SUV", price: 3500, seats: 4, fuel: "Diesel", mileage: "15 kmpl", rating: "4.7", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/12264/1759841599514/front-right-view-120.jpg", transmission: "4x4 Manual", luggage: "2 Bags", features: "Off-Road Capabilities, Removable Roof" },
    { id: 10, name: "Toyota Fortuner", type: "SUV", price: 6000, seats: 7, fuel: "Diesel", mileage: "10 kmpl", rating: "4.9", img: "https://t4.ftcdn.net/jpg/03/27/79/45/360_F_327794551_qDqXLV3Ni1yiiOreuJucN4Y78PRdI7Uy.jpg", transmission: "4x4 Auto", luggage: "5 Bags", features: "Leather Seats, Power Tailgate" },
    { id: 11, name: "Mahindra XUV700", type: "SUV", price: 4500, seats: 7, fuel: "Petrol", mileage: "13 kmpl", rating: "4.9", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV700/10794/1762509966753/front-left-side-47.jpg", transmission: "Automatic", luggage: "4 Bags", features: "ADAS Level 2, Dual Screen Display" },

    { id: 12, name: "BMW 3 Series", type: "Luxury", price: 10000, seats: 5, fuel: "Petrol", mileage: "12 kmpl", rating: "4.9", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/BMW/3-Series/10574/1761732994122/front-left-side-47.jpg", transmission: "Automatic", luggage: "3 Bags", features: "M-Sport Package, Ambient Lighting" },
    { id: 13, name: "Audi A6", type: "Luxury", price: 11000, seats: 5, fuel: "Petrol", mileage: "14 kmpl", rating: "4.8", img: "https://www.shutterstock.com/image-photo/krasnoyarsk-russia-december-1-2023-600nw-2426265899.jpg", transmission: "Automatic", luggage: "4 Bags", features: "Matrix LED Tech, Virtual Cockpit" },
    { id: 14, name: "Mercedes-Benz C-Class", type: "Luxury", price: 12000, seats: 5, fuel: "Diesel", mileage: "13 kmpl", rating: "5.0", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/C-Class/10858/1774342866770/front-left-side-47.jpg", transmission: "Automatic", luggage: "4 Bags", features: "Burmester Audio, Massage Seats" },
    { id: 15, name: "Range Rover Evoque", type: "Luxury", price: 13000, seats: 5, fuel: "Diesel", mileage: "12 kmpl", rating: "4.8", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Land-Rover/Range-Rover-Evoque/12549/1767783202589/front-left-side-47.jpg", transmission: "4x4 Auto", luggage: "4 Bags", features: "Terrain Response 2, Meridian Sound" }
];

let currentDisplayVehicles = [...allVehicles];
let isSortAscending = true; 


// 3. AUTHENTICATION (LOGIN / LOGOUT)
function validateLogin() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    let isValid = true;
    document.getElementById("user-error").style.display = "none";
    document.getElementById("pass-error").style.display = "none";

    if(user.trim().length < 5) { document.getElementById("user-error").style.display = "block"; isValid = false; }
    if(pass.length < 8) { document.getElementById("pass-error").style.display = "block"; isValid = false; }

    if(isValid) {
        document.getElementById("login-wrapper").style.display = "none";
        document.getElementById("app-section").style.display = "block";
        document.getElementById("nav-account").style.display = "block";
        document.getElementById("welcome-text").innerText = user;
        applyFilters();
    }
}

function logout() {
    document.getElementById("app-section").style.display = "none";
    document.getElementById("nav-account").style.display = "none";
    document.getElementById("login-wrapper").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}


// 4. MY GARAGE SYSTEM
let myGarage = []; 
let viewingGarageOnly = false; 

function toggleGarageItem(carId) {
    let index = myGarage.indexOf(carId);
    if (index === -1) {
        myGarage.push(carId);
    } else {
        myGarage.splice(index, 1);
    }
    
    let btn = document.getElementById("garageNavBtn");
    btn.innerText = viewingGarageOnly || myGarage.length > 0 ? `❤️ My Garage (${myGarage.length})` : `🤍 My Garage (${myGarage.length})`;
    applyFilters(); 
}

function toggleGarageView() {
    viewingGarageOnly = !viewingGarageOnly;
    let btn = document.getElementById("garageNavBtn");
    
    if (viewingGarageOnly) {
        btn.classList.add("active-view");
        btn.innerText = `❤️ My Garage (${myGarage.length})`;
    } else {
        btn.classList.remove("active-view");
        btn.innerText = `🤍 My Garage (${myGarage.length})`;
    }
    applyFilters();
}


// 5. SEARCH, FILTER, AND GRID RENDERING
function applyFilters() {
    let typeSelection = document.getElementById("typeFilter").value;
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    
    currentDisplayVehicles = allVehicles.filter(car => { 
        let matchesType = (typeSelection === "All" || car.type === typeSelection);
        let matchesSearch = car.name.toLowerCase().includes(searchQuery);
        let matchesGarageMode = true;
        
        if (viewingGarageOnly) matchesGarageMode = myGarage.includes(car.id);
        
        return matchesType && matchesSearch && matchesGarageMode; 
    });

    document.getElementById("sortBtn").innerText = "Sort by Price";
    isSortAscending = true; 
    drawGrid(currentDisplayVehicles);
}

function drawGrid(arrayToDraw) {
    const grid = document.getElementById("vehicle-grid");
    grid.innerHTML = ""; 
    
    if(arrayToDraw.length === 0) { 
        grid.innerHTML = "<h3 style='color: #FFFFFF; grid-column: 1 / -1;'>No vehicles match your search.</h3>"; 
        return; 
    }

    arrayToDraw.forEach(car => {
        let isSaved = myGarage.includes(car.id);
        let garageBtnText = isSaved ? "❤️ Saved" : "🤍 Save";
        let garageBtnClass = isSaved ? "btn-garage-saved" : "btn-garage";

        const cardHTML = `
            <div class="card">
                <img src="${car.img}" alt="${car.name} Image">
                
                <div class="card-content">
                    <h3>${car.name}</h3>
                    <div class="rating">★ ${car.rating} / 5</div>
                    
                    <ul class="specs-grid">
                        <li>⛽ ${car.fuel}</li>
                        <li>⚙️ ${car.transmission}</li>
                        <li>💺 ${car.seats} Seats</li>
                        <li>🧳 ${car.luggage}</li>
                        <li>🛣️ ${car.mileage}</li>
                        <li>🏷️ ${car.type}</li>
                    </ul>
                    
                    <p class="features-text">✨ ${car.features}</p>
                </div>

                <div class="card-actions">
                    <div class="price">₹${car.price.toLocaleString('en-IN')} <span>/ day</span></div>
                    <button class="btn" onclick="bookCar('${car.name}', ${car.price})">Reserve Now</button>
                    <button class="${garageBtnClass}" onclick="toggleGarageItem(${car.id})">${garageBtnText}</button>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}


// 6. SORTING (MERGE SORT ALGORITHM)
function toggleSort() {
    currentDisplayVehicles = mergeSort(currentDisplayVehicles, isSortAscending);
    const sortBtn = document.getElementById("sortBtn");
    if (isSortAscending) { sortBtn.innerText = "Sorted: Low to High ▲"; } else { sortBtn.innerText = "Sorted: High to Low ▼"; }
    drawGrid(currentDisplayVehicles);
    isSortAscending = !isSortAscending; 
}

function mergeSort(arr, isAsc) {
    if (arr.length <= 1) return arr; 
    const middleIndex = Math.floor(arr.length / 2);
    const leftSide = arr.slice(0, middleIndex);
    const rightSide = arr.slice(middleIndex);
    return merge(mergeSort(leftSide, isAsc), mergeSort(rightSide, isAsc), isAsc);
}

function merge(left, right, isAsc) {
    let result = [], l = 0, r = 0;
    while (l < left.length && r < right.length) {
        let takeLeft = isAsc ? left[l].price < right[r].price : left[l].price > right[r].price;
        if (takeLeft) { result.push(left[l]); l++; } else { result.push(right[r]); r++; }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
}


// 7. BOOKING SYSTEM ALERT
function bookCar(name, price) {
    let input = prompt(`Book: ${name}\nRate: ₹${price}/day\n\nEnter number of days:`, "1");
    if (input === null) return; 

    let days = parseInt(input);
    if (isNaN(days) || days <= 0) {
        alert("Booking Failed: Please enter a valid number of days.");
    } else {
        let total = days * price;
        alert(`🔥 RESERVATION SECURED! 🔥\n\nVehicle: ${name}\nDuration: ${days} days\nTotal: ₹${total.toLocaleString('en-IN')}`);
    }
}
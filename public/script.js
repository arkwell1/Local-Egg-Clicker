const socket = io();
let clickCount = 0;
let eggTypes = [
    { threshold: 250, imgSrc: "egg2.png" },
    { threshold: 750, imgSrc: "egg3.png" },
    { threshold: 1500, imgSrc: "egg4.png" },
    { threshold: 3000, imgSrc: "egg5.png" },
    { threshold: 6500, imgSrc: "egg6.png" },
    { threshold: 15000, imgSrc: "egg7.png" },
    { threshold: 25000, imgSrc: "egg8.png" },
    { threshold: 40000, imgSrc: "egg9.png" },
    { threshold: 60000, imgSrc: "egg10.png" },
    { threshold: 75000, imgSrc: "egg11.png" },
    { threshold: 100000, imgSrc: "egg12.png" },
    { threshold: 150000, imgSrc: "egg13.png" },
    { threshold: 200000, imgSrc: "egg14.png" },
    { threshold: 250000, imgSrc: "egg15.png" },
    { threshold: 300000, imgSrc: "egg16.png" },
    { threshold: 350000, imgSrc: "egg17.png" },
    { threshold: 400000, imgSrc: "egg18.png" },
    { threshold: 450000, imgSrc: "egg19.png" },
    { threshold: 500000, imgSrc: "egg20.png" },
    { threshold: 550000, imgSrc: "egg21.png" },
    { threshold: 575000, imgSrc: "egg22.png" },
    { threshold: 650000, imgSrc: "egg23.png" },
    { threshold: 875000, imgSrc: "egg24.png" },
    { threshold: 1000000, imgSrc: "egg25.png" },
    // Add more egg types with their respective thresholds as needed
];

function clickEgg() {
    clickCount++;
    document.getElementById('clickCount').innerText = numberWithCommas(clickCount);
    updateProgressBar(clickCount); // Update progress bar on click
    
    // Check if it's time to change the egg image
    for (let i = eggTypes.length - 1; i >= 0; i--) {
        if (clickCount >= eggTypes[i].threshold) {
            document.getElementById('egg').src = eggTypes[i].imgSrc;
            break;
        }
    }
    
    socket.emit('click', clickCount);
}

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('clickCount', (count) => {
    clickCount = count;
    document.getElementById('clickCount').innerText = numberWithCommas(clickCount);
    updateProgressBar(clickCount); // Update progress bar when receiving updated count
    
    // Check if it's time to change the egg image when receiving updated count
    for (let i = eggTypes.length - 1; i >= 0; i--) {
        if (clickCount >= eggTypes[i].threshold) {
            document.getElementById('egg').src = eggTypes[i].imgSrc;
            break;
        }
    }
});

function updateProgressBar(clickCount) {
    const progressBar = document.getElementById('progressBar');
    const progressLabel = document.getElementById('progressLabel');
    const progress = (clickCount / 1000000) * 100; // Calculate progress percentage
    progressBar.style.width = `${progress}%`; // Set width of progress bar dynamically
    progressLabel.textContent = `${numberWithCommas(clickCount)}/1,000,000`; // Update progress label
}

// Function to add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

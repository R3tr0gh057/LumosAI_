import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

//calculate time


//Chart

/*
var options = {
    series: [{
    name: 'Power usage',
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5]
  }],
    chart: {
    height: 350,
    type: 'line',
  },
  forecastDataPoints: {
    count: 7
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ['1/11/2024', '2/11/2024', '3/11/2024', '4/11/2024', '5/11/2024', '6/11/2024', '7/11/2024', '8/11/2024', '9/11/2024', '10/11/2024', '11/11/2024', '12/11/2024'],
    tickAmount: 10,
    labels: {
      formatter: function(value, timestamp, opts) {
        return opts.dateFormatter(new Date(timestamp), 'dd MMM')
      }
    }
  },
  title: {
    text: 'Power Usage',
    align: 'left',
    style: {
      fontSize: "16px",
      color: '#666'
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: [ '#9819d2'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    },
  },
  yaxis: {
    min: -10,
    max: 40
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
*/


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClFl9Z83m1_cKfjOBWmgPASfh6JxBEbt4",
  authDomain: "lumosai-8c4e8.firebaseapp.com",
  databaseURL: "https://lumosai-8c4e8-default-rtdb.firebaseio.com",
  projectId: "lumosai-8c4e8",
  storageBucket: "lumosai-8c4e8.appspot.com",
  messagingSenderId: "1027651970462",
  appId: "1:1027651970462:web:1a48cb44d763c32d62e28f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//type 1
// Initialize variables
var timeON = 0;
var led1Times = 0;
var led2Times = 0;
var regular = 0;
var saver = 0;


// Function to start timer when checkbox is checked
function startTimer() {
  let startTime = Date.now();
  const timerInterval = setInterval(() => {
    timeON = Math.floor((Date.now() - startTime) / 1000);
  }, 1000);

  // Stop timer when checkbox is unchecked
  document.getElementById("check").addEventListener("change", function () {
    if (!this.checked) {
      clearInterval(timerInterval);
      // Store data in Firestore
      storeData();
    }
  });

  document.getElementById("check2").addEventListener("change", function () {
    if (!this.checked) {
      clearInterval(timerInterval);
      // Store data in Firestore
      storeData();
    }
  });
}

// Function to increment variables
function incrementVariables() {
  document.getElementById("check").addEventListener("change", function () {
    led1Times+=1;
  });

  document.getElementById("check2").addEventListener("change", function () {
    led2Times+=1;
  });
}

// Function to calculate regular and saver variables
function calculateVariables() {
  regular += 10 / timeON;
  saver += 5 / timeON;
  return { regular, saver };
}

// Function to store data in Firestore
async function storeData() {
  const { regular, saver } = calculateVariables();
  try {
    const docRef = await addDoc(collection(db, "energyData"), {
      timeON,
      led1Times,
      led2Times,
      regular,
      saver,
      timestamp: Date.now(),
    });
    console.log("Data stored in Firestore with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to plot graph using Chart.js
function plotGraph() {
  onSnapshot(collection(db, "energyData"), (querySnapshot) => {
    let regularData = [];
    let saverData = [];
    let labels = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      labels.push(new Date(data.timestamp).getHours());
      if (data.regular) regularData.push(data.regular);
      if (data.saver) saverData.push(data.saver);
    });

    // Plot graph
    const ctx = document.getElementById("chart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Regular",
            data: regularData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "Saver",
            data: saverData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
    });
  });
}

// Start the timer and plot the graph
window.onload = function () {
  startTimer();
  incrementVariables();
  plotGraph();
}

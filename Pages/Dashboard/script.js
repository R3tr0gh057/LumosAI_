const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const auth = getAuth(app);
const db = getDataxbase(app);

// Function to get current date in YYYY-MM-DD format
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to update LED activation in Firebase Realtime Database
function updateLEDActivation(ledId, durationInSeconds) {
  const timestamp = Date.now();
  set(ref(db, `LED_activations/${getCurrentDate()}/${ledId}`).set(durationInSeconds));
}

// Add event listeners to toggle switches
document.querySelectorAll('.container1 input[type="checkbox"]').forEach(function(toggle, index) {
  toggle.addEventListener('change', function(event) {
    const now = Date.now();
    const checked = event.target.checked;
    if (checked) {
      toggle.dataset.startTime = now;
    } else {
      const startTime = parseInt(toggle.dataset.startTime);
      const durationInSeconds = (now - startTime) / 1000;
      updateLEDActivation(`toggle${index + 1}`, durationInSeconds);
      delete toggle.dataset.startTime;
    }
  });
});

// Chart rendering
var options = {
  series: [{
    name: 'LED Activations',
    data: [] // Data will be fetched from Firebase
  }],
  chart: {
    height: 350,
    type: 'line',
  },
  xaxis: {
    type: 'datetime'
  }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// Listen for changes in LED activations and update the chart
firebase.database().ref(db,'LED_activations').on('value', function(snapshot) {
  const data = snapshot.val();
  if (data) {
    const dates = Object.keys(data).sort();
    const seriesData = dates.map(date => {
      const totalActivation = Object.values(data[date]).reduce((acc, curr) => acc + curr, 0);
      return [new Date(date), totalActivation];
    });
    chart.updateSeries([{ data: seriesData }]);
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, onSnapshot, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

const toggler = document.getElementById('theme-toggle');
const led1time = document.getElementById('led1time');
const led1power = document.getElementById('led1power');
const led2time = document.getElementById('led2time');
const led2power = document.getElementById('led2power');
const totalenergy = document.getElementById('totalenergy');
const totaltime = document.getElementById('totaltime');
const totalsavedenergy = document.getElementById('totalsavedenergy');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

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

// SIDE DATA
const collectionName = "energyData";
var led1duration = await getSpecificField(collectionName, "led1timeON");
var led2duration = await getSpecificField(collectionName, "led2timeON");
var led1Times = await getSpecificField(collectionName, "led1counter");
var led2Times = await getSpecificField(collectionName, "led2counter");
var led1regular = await getSpecificField(collectionName, "led1regularusage");
var led2regular = await getSpecificField(collectionName, "led2regularusage");
var regular = await getSpecificField(collectionName, "regularusage");
var saver = await getSpecificField(collectionName, "saverusage");
var timestamp = await getSpecificFieldSorted(collectionName, "timestamp");

  // Calculate the sum of the array values
  const totalduration1 = led1duration.reduce((acc, val) => acc + val, 0);
  const totalduration2 = led2duration.reduce((acc, val) => acc + val, 0);
  const totalled1usage = led1regular.reduce((acc, val) => acc + val, 0);
  const totalled2usage = led2regular.reduce((acc, val) => acc + val, 0);
  const totalLED1 = led1Times.reduce((acc, val) => acc + val, 0);
  const totalLED2 = led2Times.reduce((acc, val) => acc + val, 0);
  const totalRegular = regular.reduce((acc, val) => acc + val, 0);
  const totalSaver = saver.reduce((acc, val) => acc + val, 0);

  console.log(totalduration1+" "+totalduration2);
  const totalusage = totalduration1 + totalduration2;

  // Update the site data
  led1time.textContent = (totalduration1/3600).toFixed(3) + "hrs";
  led1power.textContent = totalled1usage.toFixed(3) + "wh";
  led2time.textContent = (totalduration2/3600).toFixed(3) + "hrs";
  led2power.textContent = totalled2usage.toFixed(3) + "wh";
  totalenergy.textContent = totalRegular.toFixed(3) + "wh";
  totaltime.textContent = totalusage + "hrs";
  totalsavedenergy.textContent = (totalRegular-totalSaver).toFixed(3) + "wh"
  


  const documents = [];
  let led1timeON = 0;
  let led2timeON = 0;
  var led1counter = 0;
  var led2counter = 0;
  var led1regularusage = 0;
  var led2regularusage = 0;
  var saverusage = 0;

  // Function to fetch all documents from a collection and store them in an array
async function getAllDocuments(collectionName) {
    try {
      // Get a reference to the collection
      const collectionRef = collection(db, collectionName);
      // Get all documents in the collection
      const querySnapshot = await getDocs(collectionRef);
      // Iterate through each document and push it to the array
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return [];
    }
  }
  
  // Usage example
  async function fetchAndStoreDocuments() {
    const collectionName = "energyData";
    const documents = await getAllDocuments(collectionName);
    console.log("Documents from collection:", documents);
  }
  fetchAndStoreDocuments();

// Function to fetch a specific field from documents in a collection and store them in an array
async function getSpecificField(collectionName, fieldName) {
    const fieldValues = [];
    try {
      // Get a reference to the collection
      const collectionRef = collection(db, collectionName);
      // Get all documents in the collection
      const querySnapshot = await getDocs(collectionRef);
      // Iterate through each document and extract the field value
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.hasOwnProperty(fieldName)) { // Check if the field exists in the document
          const fieldValue = data[fieldName];
          const roundedValue = parseFloat(fieldValue).toFixed(1); // Round to one decimal place
          fieldValues.push(parseFloat(roundedValue)); // Parse the rounded value back to a float and push to the array
        }
      });
      return fieldValues;
    } catch (error) {
      console.error("Error fetching field values: ", error);
      return [];
    }
  }

// get the sorted values for timestamp
async function getSpecificFieldSorted(collectionName, fieldName) {
    const fieldValues = [];
    try {
        // Get a reference to the collection
        const collectionRef = collection(db, collectionName);
        // Get all documents in the collection
        const querySnapshot = await getDocs(collectionRef);
        // Initialize an array to store the field values
        const fieldValues = [];
        // Iterate through each document and extract the field value
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.hasOwnProperty(fieldName)) { // Check if the field exists in the document
            fieldValues.push(data[fieldName]);
          }
        });
        // Sort the field values in ascending order
        fieldValues.sort((a, b) => a - b); // Change to b - a for descending order
        return fieldValues;
      } catch (error) {
        console.error("Error fetching field values: ", error);
        return [];
      }
  }

// Function to start and stop timer for checkbox with ID "check"
function toggleCheckTimer() {
    let startTime = 0;
    let timerInterval;
  
    document.getElementById("check").addEventListener("change", function () {
        if (this.checked) {
            led1counter += 1;
            startTime = Date.now();
            timerInterval = setInterval(() => {
            console.log("Timer for checkbox 'check' is running...");
            }, 1000);
        } else {
            clearInterval(timerInterval);
            const endTime = Date.now();
            const duration = endTime - startTime;
            led1timeON = Math.floor((Date.now() - startTime) / 1000);
            console.log("Timer for checkbox 'check' stopped. Duration:", led1timeON, "seconds");
            led1regularusage = 10 / led1timeON;
            saverusage = 5 / (led1timeON+led2duration);
            storeData();
        }
    });
  }
  toggleCheckTimer();

// Function to start and stop timer for checkbox with ID "check1"
function toggleCheck1Timer() {
    let startTime = 0;
    let timerInterval;
  
    document.getElementById("check2").addEventListener("change", function () {
        if (this.checked) {
            led2counter += 1;
            startTime = Date.now();
            timerInterval = setInterval(() => {
            console.log("Timer for checkbox 'check1' is running...");
            }, 1000);
        } else {
            clearInterval(timerInterval);
            const endTime = Date.now();
            const duration = endTime - startTime;
            led2timeON = Math.floor((Date.now() - startTime) / 1000);
            console.log("Timer for checkbox 'check1' stopped. Duration:", led2timeON, "seconds");
            led2regularusage = 10 / led2duration;
            saverusage = 5 / (led1timeON+led2duration);
            storeData()
        }
    });
  }
  toggleCheck1Timer();
  
  // Function to store data in Firestore
  async function storeData() {
    const regularusage = led1regularusage + led2regularusage;
    try {
      const docRef = await addDoc(collection(db, "energyData"), {
        led1timeON,
        led2timeON,
        led1counter,
        led2counter,
        regularusage,
        led1regularusage,
        led2regularusage,
        saverusage,
        timestamp: Date.now(),
      });
      console.log("Data stored in Firestore with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

var options = {
    series: [
        {
            name: 'Power usage',
            data: regular
        },
        {
            name: 'Power saver',
            data: saver
        }

    ],
    chart: {
    height: 550,
    type: 'line',
    animations: {
        initialAnimation: {
          enabled: true
        }
    }
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
    categories: timestamp, // Assuming labels contain timestamps in milliseconds
    tickAmount: 10,
    labels: {
      formatter: function(value, timestamp, opts) {
        const date = new Date(timestamp);
        // Use the toLocaleTimeString() method to format the time part
        return opts.dateFormatter(date, 'HH:mm:ss');
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
    min: 0,
    max: 2
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

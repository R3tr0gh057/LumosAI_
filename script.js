document.addEventListener('DOMContentLoaded', function () {
    const ledButton1 = document.getElementById('ledButton1');
    const ledButton2 = document.getElementById('ledButton2');

    //js for red led
    ledButton1.addEventListener('click', function () {
        
        // Send a request to the ESP8266 when the button is clicked
        fetch('https://bulldog-promoted-accurately.ngrok-free.app/toggle-led1', {
          method: "get",
          headers: new Headers({
            'Access-Control-Allow-Origin' : '*',
            'ngrok-skip-browser-warning': '69420',
          }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log the response from the ESP8266
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    
    //js for blue led
    ledButton2.addEventListener('click', function () {
        
        // Send a request to the ESP8266 when the button is clicked
        fetch('https://bulldog-promoted-accurately.ngrok-free.app/toggle-led2', {
          method: "get",
          headers: new Headers({
            'Access-Control-Allow-Origin' : '*',
            'ngrok-skip-browser-warning': '69420',
          }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log the response from the ESP8266
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    //js for servo control unlock
    ledButton2.addEventListener('click', function () {
        
        // Send a request to the ESP8266 when the button is clicked
        fetch('https://bulldog-promoted-accurately.ngrok-free.app/unlock', {
          method: "get",
          headers: new Headers({
            'Access-Control-Allow-Origin' : '*',
            'ngrok-skip-browser-warning': '69420',
          }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log the response from the ESP8266
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    //js for servo control lock
    ledButton2.addEventListener('click', function () {
        
        // Send a request to the ESP8266 when the button is clicked
        fetch('https://bulldog-promoted-accurately.ngrok-free.app/lock', {
          method: "get",
          headers: new Headers({
            'Access-Control-Allow-Origin' : '*',
            'ngrok-skip-browser-warning': '69420',
          }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log the response from the ESP8266
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
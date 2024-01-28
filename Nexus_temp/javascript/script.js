document.addEventListener('DOMContentLoaded', function () {
    const ledButton = document.getElementById('ledButton');

    ledButton.addEventListener('click', function () {
        // Send a request to the ESP8266 when the button is clicked
        fetch('/toggle-led')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
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

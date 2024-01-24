#include <ESP8266WiFi.h>

const char* ssid     = "";
const char* password = "";

void setup() {
  Serial.begin(9600);
  delay(10);
  Serial.println(" ");
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to ");
  Serial.print(ssid); 
  Serial.println(" ...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print("."); 
    Serial.print(" ");
  }

  Serial.println(' ');
  Serial.println("Connection established!");  
  Serial.print("IP address:");
  Serial.println(WiFi.localIP());
}

void loop() { }
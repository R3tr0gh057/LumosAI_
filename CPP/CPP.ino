#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char *ssid = "Redmi Note 10 Pro";
const char *password = "12345687";

ESP8266WebServer server(3000);

int ledPin = D1;

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("IP: ");
  Serial.print(WiFi.localIP());

  server.on("/toggle-led", HTTP_GET, []() {
      digitalWrite(ledPin, !digitalRead(ledPin));
      server.send(200, "text/plain", "LED Toggled");
  });

  // Add CORS headers for all requests
  server.onNotFound([](){
    if (server.method() == HTTP_OPTIONS) {
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.sendHeader("Access-Control-Max-Age", "10000");
      server.sendHeader("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
      server.sendHeader("Access-Control-Allow-Headers", "*");
      server.send(204);
    } else {
      server.send(404, "text/plain", "Not Found");
    }
  });

  server.begin();
}

void loop() {
    server.handleClient();
}
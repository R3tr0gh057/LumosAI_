#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char *ssid = "Celeste_2.4";
const char *password = "7907003596";

ESP8266WebServer server(80);

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

  server.on("/toggle-led", HTTP_GET, []() {
      digitalWrite(ledPin, !digitalRead(ledPin));
      server.send(200, "text/plain", "LED Toggled");
  });

  server.begin();
}

void loop() {
    server.handleClient();
}

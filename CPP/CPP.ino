#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char *ssid = "Celeste_2.4";
const char *password = "7907003596";

ESP8266WebServer server(3000);

int ledPin1 = D1;
int ledPin2 = D2;

void setup() {
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  digitalWrite(ledPin1, LOW);
  digitalWrite(ledPin2, LOW);
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("IP: ");
  Serial.print(WiFi.localIP());

  server.on("/toggle-led1", HTTP_GET, []() {
      digitalWrite(ledPin1, !digitalRead(ledPin1));
      server.send(200, "text/plain", "LED Toggled");
  });

  server.on("/toggle-led2", HTTP_GET, []() {
      digitalWrite(ledPin2, !digitalRead(ledPin2));
      server.send(200, "text/plain", "LED Toggled");
  });

  server.on("/blink-led1", HTTP_GET, []() {
      digitalWrite(ledPin1, !digitalRead(ledPin1));
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
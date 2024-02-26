#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char *ssid = "Celeste_2.4";
const char *password = "7907003596";

ESP8266WebServer server(3000);

int ledPin1 = D7; //blue
int ledPin2 = D6; //red
int temp = 0;
int temp2 = 0;

void setup() {
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  digitalWrite(ledPin1, LOW);
  digitalWrite(ledPin2, LOW);
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.print(".");
  }
  Serial.println("Connected to WiFi");
  Serial.println("IP: ");
  Serial.print(WiFi.localIP());

  server.on("/toggle-led1", HTTP_GET, []() {
      digitalWrite(ledPin1, !digitalRead(ledPin1));
      if (digitalRead(ledPin1) == HIGH){
        server.send(200, "text/plain", "hall room lights are turned on");
      }
      else{
        server.send(200, "text/plain", "hall room lights are turned off");
      }
  });

  server.on("/toggle-led2", HTTP_GET, []() {
      digitalWrite(ledPin2, !digitalRead(ledPin2));
      if (digitalRead(ledPin2) == HIGH){
        server.send(200, "text/plain", "Bedroom lights are turned on");
      }
      else{
        server.send(200, "text/plain", "Bedroom lights are turned off");
      }
  });

  server.on("/power-saver1", HTTP_GET, [](){
      if (temp == 0) {
        analogWrite(ledPin1, 100);
        server.send(200, "text/plain", "Power Saving Mode Activated");
        temp = 1;
      }
      else {
        analogWrite(ledPin1, 254);
        server.send(200, "text/plain", "Power Saving Mode Deactivated");
        temp = 0;
      }
      
      int temp1 = analogRead(ledPin1);
      Serial.println(temp1);
  });

  server.on("/power-saver2", HTTP_GET, [](){
      if (temp2 == 0) {
        analogWrite(ledPin2, 100);
        server.send(200, "text/plain", "Power Saving Mode Activated");
        temp2 = 1;
      }
      else {
        analogWrite(ledPin2, 254);
        server.send(200, "text/plain", "Power Saving Mode Deactivated");
        temp2 = 0;
      }
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
# Projekt "Aplikacja pogodowa"

Autor: Nikodem Pałka  
Repozytorium GitHub: https://github.com/NaPewnoNieMefs/moja-pogoda
Obraz DockerHub: https://hub.docker.com/r/nikodemxppp/pogoda-app

---

## 1. Krótki opis projektu

Aplikacja webowa Node.js/Express pozwala użytkownikowi wybrać kraj i miasto, a następnie pobiera aktualną pogodę (WeatherAPI) dla wybranej lokalizacji. Po starcie loguje datę uruchomienia, autora i port. Całość działa w kontenerze Docker.

---

## 2. Pliki projektu

- `app.js` – kod źródłowy serwera
- `package.json` – definicja zależności
- `Dockerfile` – plik budujący obraz Dockera
- `public/style.css` – styl CSS
- `zadanie1.md` – sprawozdanie

---

## 3. Instrukcja budowania i uruchamiania

### Budowanie obrazu Dockera
docker build -t pogoda-app .

### Uruchamianie kontenera
docker run -d -p 3000:3000 --name moja-pogoda pogoda-app

### Sprawdzanie logów uruchomieniowych
docker logs moja-pogoda

### Sprawdzanie ilości warstw i rozmiaru obrazu
docker image inspect pogoda-app --format='{{json .RootFS.Layers}}'
docker images pogoda-app

### Sprawdzanie healthcheck
docker ps

### Screeny potwierdzające działanie
![image](https://github.com/user-attachments/assets/b496ccdc-43f3-4a1a-a1fb-38b7b44e8b8d)

![image](https://github.com/user-attachments/assets/5384966c-1859-46ff-8197-cdea8fd45e51)


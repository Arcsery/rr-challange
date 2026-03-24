# Mini xRM – Partner és Activity Management

## Futtatási útmutató

### Docker használatával (ajánlott)

A teljes alkalmazás eggy paranccsal indítható a fő könyvtárból:

```bash
docker compose up
```

Elérhető szolgáltatások:

Frontend:
http://localhost:4200

Backend API:
http://localhost:8080/api

Swagger/OpenAPI
http://localhost:8080/swagger-ui/index.html

Adatbázis (PostgreSQL):
localhost:5432


---

### Lokális futtatás Docker nélkül

#### Backend indítása

Szükséges:

- Java 21
- Maven
- PostgreSQL

Indítás:

```bash
cd backend
mvn spring-boot:run
```

#### Frontend indítása

Szükséges:

- Node.js 20+

Indítás:

```bash
cd frontend
npm install
npm start
```

Frontend:

http://localhost:4200


---

## Rövid architektúra leírás

Az alkalmazás klasszikus rétegzett architektúrát követ.

Backend struktúra:

A fő domain részek külön package-ekbe vannak szervezve:  
  
- `partner`  
- `activity`  
  
Ezeken belül találhatók az adott funkcionalitáshoz tartozó osztályok, például:  
  
- entity  
- controller  
- repository  
- service  
- service implementation  
- dto

Adatfolyam:

Controller → Service → Repository → Database

Fő architekturális elvek:

- DTO alapú kommunikáció az API rétegben
- validáció DTO szinten történik
- üzleti logika a service layer-ben található
- globális exception handler biztosít egységes hibakezelést

Frontend struktúra:

A domainhez tartozó funkcionalitások külön komponenscsoportokba vannak szervezve, például:  
  
- partner kezelés  
- activity kezelés  
    
A közösen használt UI elemek külön `shared` mappában találhatók, például:  
  
- navigációs oldalsáv  
- megerősítő dialógus  
- snackbar üzenetek

Kommunikáció:

Angular service → REST API → Spring Boot backend


---

## Technológiai döntések indoklása

### 1. Spring Boot használata backendhez

A Spring Boot gyors és strukturált REST API fejlesztést tesz lehetővé.

Előnyei:

- dependency injection támogatás
- beépített validation rendszer
- Spring Data JPA integráció
- globális exception handling támogatás
- jól skálázható architektúra

---

### 2. Angular Material használata frontendhez

Az Angular Material modern és reszponzív UI komponenseket biztosít.

Előnyei:

- egységes megjelenés
- responsive layout támogatás
- gyors implementáció dialog és form komponensekkel
- accessibility támogatás
- 

---

### 3. Lombok használata a backendben

A Lombok dependency jelentősen csökkenti a boilerplate kód mennyiségét.

Segítségével elkerülhető:

- getter/setter metódusok manuális írása
- konstruktorok generálása
- builder pattern kézi implementálása

### 4. Maven használata build eszközként  
  
A projekt build eszközeként Maven került kiválasztásra.  
  
Előnyei:  
  
- széles körben használt a Spring Boot ökoszisztémában  
- stabil és jól dokumentált dependency kezelés  
- konzisztens projektstruktúra  
- könnyű integráció Docker környezetben  
- egyszerű futtatás külön konfiguráció nélkül  
  
A Maven használata különösen előnyös Spring Boot projektek esetében,  
mivel a legtöbb hivatalos dokumentáció és minta projekt is erre épül.  
  
A Gradle szintén megfelelő alternatíva lehet, azonban jelen projekt esetében  
a Maven egyszerűbb és gyorsabban konfigurálható megoldást biztosított.

---

## Kompromisszumok időhiány miatt

A feladat elkészítése során néhány fejlesztési terület későbbi bővítésre maradt.


### Optimistic locking csak a Partner entitásnál került implementálásra

Az Activity entitás esetében is indokolt lenne az optimistic locking használata
konkurens módosítások kezelésére, azonban ennek implementálására már nem maradt idő.


---

### Backend oldali részletes logolás nincs implementálva

Jelenleg csak alap Spring Boot logolás érhető el.

Production környezetben indokolt lenne:

- service metódus hívások logolása
- hibakezelési események naplózása
- audit jellegű logok bevezetése


---

### Pagination jelenleg csak frontend oldalon működik

A listaoldalak lapozása jelenleg frontend oldalon történik.

Nagyobb adatmennyiség esetén indokolt lenne:

Spring Pageable alapú backend pagination bevezetése

---

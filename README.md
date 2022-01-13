**Dokumentace API pro databázi UJEP**
----

### Přidání pomůcky do databáze

* **URL**

  /data/add

* **Method:**

  `POST` 
  
*  **URL Params**

   **Required:**
 
   `nazev=[string]` `id=[string]`

   **Optional:**
 
   `autor[string]` `rok=[integer]` `nakladatel=[string]` `mistoVydani=[string]` `signatura=[string]` `isxn=[integer]`

* **Data Params**

  `{autor: "Semotanová, Eva", nazev: "Česko : Ottův historický atlas", rok: 2007, nakladatel: "Ottovo", mistoVydani: "Praha", signatura: "IN191196", "isxn": 9788073605775, id: "K.II.2.14, K.II.2.15"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{autor: "Semotanová, Eva", nazev: "Česko : Ottův historický atlas", rok: 2007, nakladatel: "Ottovo", mistoVydani: "Praha", signatura: "IN191196", "isxn": 9788073605775, id: "K.II.2.15"}`
 
* **Error Response:**

  * **Code:** 418 I'm a teapot <br />
    **Content:** `{ }`

  OR

  * **Code:** 406 Not Acceptable <br />
    **Content:** `{ rok: "2007" }`

* **Sample Call:**

  ```
  curl -X POST http://localhost:3000/data/add
   -H 'Content-Type: application/json'
   -d '{autor: "Semotanová, Eva", nazev: "Česko : Ottův historický atlas", rok: 2007, nakladatel: "Ottovo", mistoVydani: "Praha", signatura: "IN191196", "isxn": 9788073605775, id: "K.II.2.14, K.II.2.15"}'
  ```

### Získání pomůcky z databáze

 * **URL**

    /data/fetch

* **Method:**

  `POST` 
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

  `id = N, N = A->K`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{id: "D"}`
 
* **Error Response:**

  * **Code:** 418 I'm a teapot <br />
    **Content:** `{ }`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ id: "P" }`

* **Sample Call:**

  ```
  curl -X POST http://localhost:3000/data/fetch
   -H 'Content-Type: application/json'
   -d '{id: "A"}'
  ```
  
* **Notes:**

  Dokumentace je aktuální k datu 13.1. 2022
  
 

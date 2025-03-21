const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNjI0MDM4MzRiZjAwMTUwMDA4YmQiLCJpYXQiOjE3NDI1NjE4NTYsImV4cCI6MTc0Mzc3MTQ1Nn0.RPnc6GvG4_ZSjix0zwoKep7wKNAun3zI1zG9K3RalXY";
const imageUrl =
  "https://i5.cloudfable.net/styles/735x735/8.51/Black/magliette-divertenti-donna-ansia-e-sapone-scritte-ironiche-maglietta-20240919103222-2lvjncrk-t2.jpg";

const dateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

dateInFooter();

const hideSpinner = function () {
  const div = document.getElementById("spinner-container");
  div.classList.add("d-none");
};
const getEvent = function () {
  fetch(API_URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNjI0MDM4MzRiZjAwMTUwMDA4YmQiLCJpYXQiOjE3NDI1NjE4NTYsImV4cCI6MTc0Mzc3MTQ1Nn0.RPnc6GvG4_ZSjix0zwoKep7wKNAun3zI1zG9K3RalXY",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore di risposta");
      }
    })
    .then((data) => {
      hideSpinner();
      console.log("Dati ricevuti", data);
      const row = document.getElementById("products-row");

      data.forEach((prodotti) => {
        row.innerHTML =
          row.innerHTML +
          `
        <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
          <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="${prodotti.name}"  />
            <div class="card-body">
              <h5 class="card-title">${products.name}</h5>
              <p class="card-text">${prodotti.description}</p>
              <p class="card-text">${prodotti.brand}€ </p>
              <p class="card-text">${prodotti.price}€ </p>

              <a href="./details.html?id=${product._id}" class="btn btn-primary">Vai ai dettagli</a>
            </div>
          </div>
        </div>
      `;
      });
    })
    .catch((error) => {
      hideSpinner();
      console.log("si è verificato un problema", error);
    });
};

getEvent();

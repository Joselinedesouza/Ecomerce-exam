const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNjI0MDM4MzRiZjAwMTUwMDA4YmQiLCJpYXQiOjE3NDI1NjE4NTYsImV4cCI6MTc0Mzc3MTQ1Nn0.RPnc6GvG4_ZSjix0zwoKep7wKNAun3zI1zG9K3RalXY";
const imageURL =
  "https://i5.cloudfable.net/styles/735x735/8.51/Black/magliette-divertenti-donna-ansia-e-sapone-scritte-ironiche-maglietta-20240919103222-2lvjncrk-t2.jpg";
const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

class product {
  constructor(_name, _description, _brand, _price, _imageUrl) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }
}

const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("imageUrl");

const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

if (eventId) {
  fetch(eventsURL + "/" + eventId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella fetch");
      }
    })
    .then((data) => {
      nameInput.value = data.name;
      descriptionInput.value = data.description;
      brandInput.value = data.brand;
      priceInput.value = data.price;
      imageUrlInput.value = data.imageUrl;
    })
    .catch((err) => console.log("ERRORE DEL RIPOPOLAMENTO DEL FORM", err));
}

const form = document.getElementById("event-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const product = new product(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    priceInput.value,
    imageUrlInput.value
  );

  console.log("Prodotti", product);

  let methodToUse;
  let URLtoUse;

  if (eventId) {
    methodToUse = "PUT";
    URLtoUse = eventsURL + "/" + eventId;
  } else {
    methodToUse = "POST";
    URLtoUse = eventsURL;
  }

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(product),
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNjI0MDM4MzRiZjAwMTUwMDA4YmQiLCJpYXQiOjE3NDI1NjE4NTYsImV4cCI6MTc0Mzc3MTQ1Nn0.RPnc6GvG4_ZSjix0zwoKep7wKNAun3zI1zG9K3RalXY",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("SALVATAGGIO COMPLETATO!");

        form.reset();
      } else {
        throw new Error("ricevuta response non ok dal backend");
      }
    })
    .catch((err) => {
      console.log("errore nel salvataggio!", err);
    });
});

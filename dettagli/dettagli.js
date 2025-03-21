const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

const URLparameters = new URLSearchParams(location.search);

const productId = URLparameters.get("id");
const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNjI0MDM4MzRiZjAwMTUwMDA4YmQiLCJpYXQiOjE3NDI1NjE4NTYsImV4cCI6MTc0Mzc3MTQ1Nn0.RPnc6GvG4_ZSjix0zwoKep7wKNAun3zI1zG9K3RalXY";

const imageUrl =
  "https://i5.cloudfable.net/styles/735x735/8.51/Black/magliette-divertenti-donna-ansia-e-sapone-scritte-ironiche-maglietta-20240919103222-2lvjncrk-t2.jpg";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

const getProductDetails = function () {
  fetch(eventsURL + "/" + productId)
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli");
      }
    })
    .then((data) => {
      console.log("DETTAGLI EVENTO", data);

      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const brandInput = document.getElementById("brand");
      const priceInput = document.getElementById("price");
      const imageUrlInput = document.getElementById("imageUrl");

      nameInput.innerText = data.nameInput;
      descriptionInput.innerText = data.descriptionInput;
      brandInput.innerText = data.brandInput;
      priceInput.innerText = data.priceInput;
      imageUrlInput.innerText = data.imageUrlInput;
      data.price + "€" + " - " + new Date(data.time).toLocaleString();
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI CONCERTO", err);
    });
};

const editProduct = function () {
  location.assign("./backoffice.html?id=" + productId);
};

const deleteProduct = function () {
  fetch(eventsURL + "/" + productId, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("CONCERTO ELIMINATO");

        location.assign("../Home/home.html");
      } else {
        throw new Error("eliminazione NON andata a buon fine!");
      }
    })
    .catch((err) => {
      console.log("ERRORE NELLA CANCELLAZIONE", err);
    });
};

getProductDetails();

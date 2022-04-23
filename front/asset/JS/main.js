//----Chargement du document----//
const $ = document;
//----Attendre que le document soit chargé dans le navigateur----//
$.addEventListener("DOMContentLoaded", () => {
  console.log("page chargée");
  //---Chargement des input.value au click du bouton submit----//
  $.querySelector("#form-contact").addEventListener("submit", async (event) => {
    //Pour éviter le rafraichissement de la page au moment du click du bouton//
    event.preventDefault();
    //Création d'un objet data pour collécter l'ensemble des input.value//
    const data = {
      firstname: $.querySelector("#firstname").value,
      lastname: $.querySelector("#lastname").value,
      mail: $.querySelector("#mail").value,
      message: $.querySelector("#message").value,
    };
    console.log(data);
    //----J'envoie une requête axios vers mon serveur----//
    const response = await axios.post("http://localhost:3000/form", data);
    console.log(response.data);
    alert(`merci pour votre formulaire. Reponse du serveur ${response.data}`);
  });
});

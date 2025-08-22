// Voici le tableau des personnes autorisé à se connecter sur la page 
const Personne_autoriser=[
    {
        email:"alioune@gmail.com",
        mot_de_passe: "passe1"
    },
    {
        email:"amy@gmail.com",
        mot_de_passe: "passe2"
    },
    {
        email:"ousmane@gmail.com",
        mot_de_passe: "passe3"
    },
    {
        email:"test@gmail.com",
        mot_de_passe: "passe0"
    },
    {
      email:"fatou@gmail.com",
      mot_de_passe: "passe4"
    },
    {
      email:"pape@gmail.com",
      mot_de_passe: "123456"
    }

];

//lien pour si l'evenement envoyer de notre bouton du formulaire est fait on passe à la collecte des informations
document.getElementById("formulaire_connexion").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  //recuperation de la valeur de l'input email et mot de passe 
  const email = document.getElementById("email").value.trim();
  const mot_de_passe = document.getElementById("mot_de_passe").value.trim();

  //variable qui nous permet de vérifier la validité des informations
  let valid = true;

  // Réinitialiser les messages
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  // Vérifier si vide
  if (email === "") {
    document.getElementById("emailError").textContent = "⚠️ Email requis";
    valid = false;
  }

  if (mot_de_passe === "") {
    document.getElementById("passwordError").textContent = "⚠️ Mot de passe requis";
    valid = false;
  }

  // Si les champs sont remplis, vérifier les identifiants
  if (valid) {
    const user = Personne_autoriser.find(u => u.email === email && u.mot_de_passe === mot_de_passe);

    //redirection vers la page admin
    if (user) {
        window.location.href = "admin.html";
    } 
    else {
      document.getElementById("passwordError").textContent = "❌ Email ou mot de passe incorrect";
    }
  }
});
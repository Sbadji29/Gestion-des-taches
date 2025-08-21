const Personne_autoriser=[
    {
        email:"test1@gmail.com",
        mot_de_passe: "passe1"
    },
    {
        email:"test2@gmail.com",
        mot_de_passe: "passe2"
    },
    {
        email:"test3@gmail.com",
        mot_de_passe: "passe3"
    },
    {
        email:"ouz@gmail.com",
        mot_de_passe: "123456"
    }
];

document.getElementById("formulaire_connexion").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  const email = document.getElementById("email").value.trim();
  const mot_de_passe = document.getElementById("mot_de_passe").value.trim();

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

    if (user) {
        window.location.href = "admin.html";
    } 
    else {
      document.getElementById("passwordError").textContent = "❌ Email ou mot de passe incorrect";
    }
  }
});
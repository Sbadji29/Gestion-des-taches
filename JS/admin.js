const users = []; // tableau des utilisateurs

// Recuperer le formulaire et le tbody du tableau
const form = document.getElementById("FormInscription");

const tbody = document.getElementById("userTableBody");

//lien pour si l'evenement envoyer de notre bouton du formulaire est fait on passe à la collecte des informations
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // reset erreurs
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Enregistrer les informations dans les variables
    const nom = form.nom.value.trim();
    const prenom = form.prenom.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    //Variable pour vérifier la validiter des champs
    let isValid = true;

    // Vérifs
    if (nom === "") {
        form.nom.nextElementSibling.textContent = "Nom obligatoire";
        isValid = false;
    }
    if (prenom === "") {
        form.prenom.nextElementSibling.textContent = "Prénom obligatoire";
        isValid = false;
    }
    if (email === "") {
        form.email.nextElementSibling.textContent = "Email obligatoire";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        form.email.nextElementSibling.textContent = "Email invalide";
        isValid = false;
    } 
    //Pour les enregistrement d'email déja existant
    else if (users.some(u => u.email === email)) {
        form.email.nextElementSibling.textContent = "Email déjà utilisé";
        isValid = false;
    }
    //Pour montre que le mot de passe doit avoir minimum 6 caracteres
    if (password.length < 6) {
        form.password.nextElementSibling.textContent = "6 caractères minimum";
        isValid = false;
    }
    //Verifier si les deux mots de passes sont les même
    if (confirmPassword !== password) {
        form.confirmPassword.nextElementSibling.textContent = "Mots de passe différents";
        isValid = false;
    }

    if (!isValid) return; // on arrête ici si erreur

    // Nouvel utilisateur avec la date actuelle
    let now = new Date();
    let date = now.toLocaleDateString("fr-FR"); 
    let heure = now.toLocaleTimeString("fr-FR"); 

    const newUser = { nom, prenom, email, password, active: true, date, heure };
    users.push(newUser);

    let status = "En cours";
    // Création ligne tableau
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nom}</td>
      <td>${prenom}</td>
      <td>${email}</td>
      <td>${date}, ${heure}</td>
      <td class="status-text">${status}</td>
      <td>
        <label class="switch">
          <input type="checkbox" ${newUser.active ? "checked" : ""}>
          <span class="slider"></span>
        </label>
        <div class="dropdown">
          <button class="options-btn" tabindex="0">⋮</button>
          <div class="dropdown-content">
            <a href="#" class="modifier">Modifier</a>
            <a href="#" class="supprimer">Supprimer</a>
          </div>
        </div>
      </td>
    `;

    // Récupérer le checkbox et le texte du statut
const checkbox = tr.querySelector("input[type=checkbox]");
const statusText = tr.querySelector(".status-text");

// Écouter le changement du switch
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    statusText.textContent = "Validé";
  } else {
    statusText.textContent = "En cours";
  }
});
    // ✅ Supprimer
    tr.querySelector(".supprimer").addEventListener("click", function (ev) {
      ev.preventDefault();
      if (confirm("Voulez-vous confirmer la suppression ?")) {
        tbody.removeChild(tr);
        const index = users.findIndex((u) => u.email === email);
        if (index > -1) users.splice(index, 1);
      }
    });

    // ✅ Modifier
    tr.querySelector(".modifier").addEventListener("click", function (ev) {
      ev.preventDefault();
      form.nom.value = nom;
      form.prenom.value = prenom;
      form.email.value = email;
      form.password.value = "";
      form.confirmPassword.value = "";
      tbody.removeChild(tr);
      const index = users.findIndex((u) => u.email === email);
      if (index > -1) users.splice(index, 1);
    });

    // ✅ Activer/désactiver
    tr.querySelector("input[type=checkbox]").addEventListener("change", function () {
      newUser.active = this.checked;
    });

    tbody.appendChild(tr);

    // reset form
    form.reset();
});


const creer_admin= document.getElementById("creer_admin");

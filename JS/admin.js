const users = []; // tableau des utilisateurs

const form = document.getElementById("FormInscription");
const tbody = document.getElementById("userTableBody");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // reset erreurs
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    const nom = form.nom.value.trim();
    const prenom = form.prenom.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

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
    } else if (users.some(u => u.email === email)) {
        form.email.nextElementSibling.textContent = "Email déjà utilisé";
        isValid = false;
    }

    if (password.length < 6) {
        form.password.nextElementSibling.textContent = "6 caractères minimum";
        isValid = false;
    }

    if (confirmPassword !== password) {
        form.confirmPassword.nextElementSibling.textContent = "Mots de passe différents";
        isValid = false;
    }

    if (!isValid) return; // on arrête ici si erreur

    // 🔹 Nouvel utilisateur
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR"); // ex : 21/08/2025
    const heure = now.toLocaleTimeString("fr-FR"); // ex : 09:35:12

    const newUser = { nom, prenom, email, password, active: false, date, heure };
    users.push(newUser);

    // 🔹 Création ligne tableau
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nom}</td>
      <td>${prenom}</td>
      <td>${email}</td>
      <td>${date}, ${heure}</td>
      <td class="status-text">${newUser.active ? "Validé" : "En cours"}</td>
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

    // 🔹 Switch statut
    const checkbox = tr.querySelector("input[type=checkbox]");
    const statusText = tr.querySelector(".status-text");

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        statusText.textContent = "Validé";
        newUser.active = true;
      } else {
        statusText.textContent = "En cours";
        newUser.active = false;
      }
    });

    // 🔹 Supprimer
    tr.querySelector(".supprimer").addEventListener("click", function (ev) {
      ev.preventDefault();
      if (confirm("Voulez-vous confirmer la suppression ?")) {
        tbody.removeChild(tr);
        const index = users.findIndex((u) => u.email === email);
        if (index > -1) users.splice(index, 1);
      }
    });

    // 🔹 Modifier
   tr.querySelector(".modifier").addEventListener("click", function (ev) {
  ev.preventDefault();
  // On récupère l'email de la ligne
  const emailLigne = tr.children[2].textContent;
  // On retrouve l'utilisateur correspondant
  const user = users.find(u => u.email === emailLigne);
  // Demander l'ancien mot de passe
  const ancien = prompt("Veuillez saisir l'ancien mot de passe pour modifier cet utilisateur :");
  if (user && ancien === user.password) {
    form.nom.value = user.nom;
    form.prenom.value = user.prenom;
    form.email.value = user.email;
    form.password.value = "";
    form.confirmPassword.value = "";

    tbody.removeChild(tr);
    const index = users.findIndex((u) => u.email === user.email);
    if (index > -1) users.splice(index, 1);
  } else {
    alert("Le mot de passe saisi n'est pas correct !");
  }
});

    tbody.appendChild(tr);

    // reset form
    form.reset();
});

const creer_admin = document.getElementById("creer_admin");

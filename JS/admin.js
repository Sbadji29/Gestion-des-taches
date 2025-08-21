const users = []; // tableau des utilisateurs

  const form = document.getElementById("FormInscription");
  const tbody = document.getElementById("userTableBody");

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const nom = form.nom.value.trim();
    const prenom = form.prenom.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    // Vérifications
    if(password !== confirmPassword){
      alert("❌ Les mots de passe ne correspondent pas !");
      return;
    }

    if(users.some(u => u.email === email)){
      alert("❌ Cet email existe déjà !");
      return;
    }

    // Ajouter dans tableau
    const newUser = { nom, prenom, email, password, active: true };
    users.push(newUser);

    // Afficher dans le tableau HTML
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nom}</td>
      <td>${prenom}</td>
      <td>${email}</td>
      <td>
        <label class="switch">
          <input type="checkbox" ${newUser.active ? "checked" : ""}>
          <span class="slider"></span>
        </label>
        <div class="dropdown">
          <button class="options-btn" tabindex="0">
            <i class="fa-solid fa-ellipsis-v"></i>
          </button>
          <div class="dropdown-content">
            <a href="#" class="modifier">Modifier</a>
            <a href="#" class="supprimer">Supprimer</a>
          </div>
        </div>
      </td>
    `;

    // Action supprimer
    tr.querySelector(".supprimer").addEventListener("click", function(e){
      e.preventDefault();
      const verif=confirm("Voulez-vous confirmer la suppression ?");
      if(verif){
        tbody.removeChild(tr);
      }
      const index = users.findIndex(u => u.email === email);
      if(index > -1) users.splice(index, 1);
    });

    // Action modifier
    tr.querySelector(".modifier").addEventListener("click", function(e){
      e.preventDefault();
      form.nom.value = nom;
      form.prenom.value = prenom;
      form.email.value = email;
      form.password.value = "";
      form.confirmPassword.value = "";
      tbody.removeChild(tr);
      const index = users.findIndex(u => u.email === email);
      if(index > -1) users.splice(index, 1);
    });

    // Action activer/désactiver
    tr.querySelector("input[type=checkbox]").addEventListener("change", function(){
      newUser.active = this.checked;
    });

    tbody.appendChild(tr);

    // Réinitialiser formulaire
    form.reset();
  });
// CREIAMO UN ARRAY IN JS DOVE SALVEREMO I NOSTRI CONTATTI
const contacts = [];

// recuperiamo i campi input dal form
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneInput = document.getElementById("phone");

// vado a creare la CLASSE per generare oggetti di tipo CONTATTO
class Contact {
  constructor(_firstName, _lastName, _phone) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.phone = _phone;
  }
  favorite = false;
}

// ora, agiamo sull'evento di submit, interrompiamo il comportamento di default
// e recuperiamo i valori degli input una volta che l'utente clicca il tasto verde
const form = document.getElementById("rubrica-form");
form.addEventListener("submit", function (e) {
  // ora fermo il comportamento di default
  e.preventDefault();
  // ora recupero i dati dai 3 campi input
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const phone = phoneInput.value;
  // ora creerò un oggetto a partire da questi 3 semplici campi, ma lo farò tramite una CLASSE
  const newContact = new Contact(firstName, lastName, phone);
  console.log("CONTATTO SALVATO!", newContact);

  // ORA SALVO ANCHE IL CONTATTO IN LOCALSTORAGE
  // prima lo aggiungo all'array contacts
  contacts.push(newContact);
  // e ora salvo l'intero array contacts in localStorage
  localStorage.setItem("contacts", JSON.stringify(contacts)); // salvare questo array in stringa JSON

  form.reset(); // svuotiamo il form una volta salvato in console
  // oggi riprendiamo e a partire da questo contatto appena salvato creiamo una CARD nella pagina
  // ho già una row pronta nell'HTML, intendo riempirla con una colonna contenente una card
  const row = document.getElementById("contacts");
  row.innerHTML += `
    <div class="col-12 col-md-4">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">${firstName} ${lastName}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Preferito: NO</h6>
          <p class="card-text">N. Telefono: ${phone}</p>
        </div>
      </div>
    </div>
  `;
});

// ULTIMO STEP:
// all'avvio della pagina, se è presente in localStorage un array di contatti, lo preleviamo
// e lo utilizziamo per RIPOPOLARE la pagina con le card precedenti

// recupero la stringa corrispondente all'array dei contatti dal localStorage e verifico che non sia null
const contactsAsString = localStorage.getItem("contacts");
if (contactsAsString) {
  // se non è null...
  // ...la ritrasformo in un array di oggetti, com'era in origine
  const previousContacts = JSON.parse(contactsAsString); // ho riottenuto un array di contatti!
  previousContacts.forEach((contact) => {
    // contact è un oggetto con firstName, lastName, phone e favorite
    // aggiungiamo il contatto corrente all'array locale dei contatti, in modo che quando aggiungerò
    // un nuovo elemento tramite il form l'array locale si mantenga sincronizzato con i contatti che
    // avevo precedentemente

    contacts.push(contact);

    const row = document.getElementById("contacts");
    row.innerHTML += `
      <div class="col-12 col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">${contact.firstName} ${contact.lastName}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Preferito: NO</h6>
            <p class="card-text">N. Telefono: ${contact.phone}</p>
          </div>
        </div>
      </div>
    `;
  });
}

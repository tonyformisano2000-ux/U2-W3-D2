// array di salvataggio dei contatti

const savings = [];

const saveUser = () => {
  const name = document.getElementById("newName").value;
  const getBack = localStorage.getItem("saved");
  const salvati = JSON.parse(getBack);
  if (name == null || salvati.includes(name)) {
    alert("Nome già salvato o non esistente, prova con un altro!");
  } else {
    savings.push(name);
    localStorage.setItem("saved", JSON.stringify(savings));
    alert(`${name} è stato aggiunto ai contatti`);
    Contatti("add");
  }
};
const deleteUser = () => {
  const name = document.getElementById("newName").value;
  const getBack = localStorage.getItem("saved");
  const terminator = JSON.parse(getBack);
  console.log("searching ", name, "in", terminator);
  if (terminator.includes(name)) {
    const index = terminator.indexOf(name);
    terminator.pop(index);
    console.log(name, " has been deleted. the array is now: ", terminator);
    alert(`${name} è stato rimosso dai contatti`);
    localStorage.setItem("saved", JSON.stringify(savings));
    Contatti("del");
  }
};

const Contatti = (x) => {
  const getBack = localStorage.getItem("saved");
  const salvati = JSON.parse(getBack);
  const row = document.getElementById("row");
  row.innerHTML = "";
  if (salvati && x === "add") {
    salvati.forEach((element) => {
      const card = document.createElement("div");
      card.innerHTML += `<img src="./Sample_User_Icon.png" class="card-img-start" alt="foto del contatto">
  <div class="card-body text-center">
    <h5 class="card-title">${element}</h5>
</div>`;
      card.classList.add("card", "col-3", "m-4");
      row.appendChild(card);
    });
  }
};
Contatti();

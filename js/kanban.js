const dugmeDodajTask = document.getElementById("dodajTask");
let taskovi = JSON.parse(localStorage.getItem("taskovi")) || [];

function sacuvajTaskove() {
  const taskoviJSON = JSON.stringify(taskovi);
  localStorage.setItem("taskovi", taskoviJSON);
}

function dodajTask() {
  const naslovElement = document.getElementById("taskNaslov");
  const opisElement = document.getElementById("taskOpis");
  const datumElement = document.getElementById("taskDatum");

  const naslov = naslovElement.value.trim();
  const opis = opisElement.value.trim();
  const datum = datumElement.value;

  if (!naslov || !opis || !datum) {
    alert("Sva polja moraju biti popunjena!");
    return;
  }

  let noviTask = {
    naslov: naslov,
    opis: opis,
    datum: datum,
    status: "planirano",
  };

  taskovi.push(noviTask);
  sacuvajTaskove();
  console.log(taskovi);
}

function pomeriTask(index) {
  let trenutniTask = taskovi[index];
  if (trenutniTask.status === "planirano") {
    trenutniTask.status = "uToku";
  } else if (trenutniTask.status === "uToku") {
    trenutniTask.status = "zavrseno";
  } else if (trenutniTask.status === "zavrseno") {
    alert("Ovaj task je već završen!");
  }
  razvrstajTaskove();
}

function obrisiTask(index) {
  if (confirm("Da li ste sigurni da želite da obrišete ovaj Task?")) {
    taskovi.splice(index, 1);
    sacuvajTaskove();
    razvrstajTaskove();
  }
}

function razvrstajTaskove() {
  const divPlanirano = document.getElementById("planirano");
  const divUToku = document.getElementById("uToku");
  const divZavrseno = document.getElementById("zavrseno");

  divPlanirano.innerHTML = "";
  divUToku.innerHTML = "";
  divZavrseno.innerHTML = "";

  taskovi.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.addEventListener("click", () => {
      pomeriTask(index);
    });
    taskElement.innerHTML = `
      <h3>${task.naslov}</h3>
      <p>${task.opis}</p>
      <p>${task.datum}</p>
      <button class="obrisiBtn">Obriši</button>
    `;

    taskElement.querySelector(".obrisiBtn").addEventListener("click", () => {
      event.stopPropagation(); // samo obrisi task - klik je bio na dugmetu i ne dozvoli da taj klik nastavi do roditeljskog elementa
      obrisiTask(index);
    });

    if (task.status === "planirano") {
      divPlanirano.appendChild(taskElement);
    } else if (task.status === "uToku") {
      divUToku.appendChild(taskElement);
    } else if (task.status === "zavrseno") {
      divZavrseno.appendChild(taskElement);
    }
  });
}

dugmeDodajTask.addEventListener("click", () => {
  dodajTask();
});
razvrstajTaskove();

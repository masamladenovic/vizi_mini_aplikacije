const tempPoljeElement = document.getElementById("temp-polje");
const dugmeUFarenhajtElement = document.getElementById("uFarenhajt");
const dugmeUCelzijusElement = document.getElementById("uCelzijus");
const rezultatPoljeElement = document.getElementById("rezultat-polje");

function pretvoriUFarenhajt(){
  if(tempPoljeElement.value === ""){
    alert("Unesite temperaturu!");
    return;
  }
  const temp = Number(tempPoljeElement.value);
  const rezultat = (temp * 9/5) + 32;
  rezultatPoljeElement.value = rezultat;
  tempPoljeElement.value = "";
}

dugmeUFarenhajtElement.addEventListener("click", () => {
  pretvoriUFarenhajt();
});

function pretvoriUCelzijus(){
  if(tempPoljeElement.value === ""){
    alert("Unesite temperaturu!");
    return;
  }
  const temp = Number(tempPoljeElement.value);
  const rezultat = (temp - 32) * 5/9;
  rezultatPoljeElement.value = rezultat;
  tempPoljeElement.value = "";
}

dugmeUCelzijusElement.addEventListener("click", () => {
  pretvoriUCelzijus();
});
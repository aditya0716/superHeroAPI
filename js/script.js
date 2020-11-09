document.getElementById("superHero").onkeyup = fetchHero;
var suggestList = document.getElementById("suggestion");
let id;
console.log("hello")

async function fetchHero() {
  var input = document.getElementById("superHero").value;
  if (input === "") {
    clearList();
    return;
  }
  await clearList();
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var responseJSON = JSON.parse(xhrRequest.response);
    var result = responseJSON.results;
    console.log(result);
    for (let r of result) {
      let newEle = document.createElement("li");
      newEle.innerText = r.name;
      newEle.classList.add("spr");
      newEle.addEventListener("click", async function () {
        id = r.id;
        await clearList();
        document.getElementById("superHero").value = r.name;
        return;
      });
      suggestList.appendChild(newEle);
    }
  };
  xhrRequest.onerror = function () {
    console.log("Request Failed");
  };
  xhrRequest.open(
    "get",
    "https://superheroapi.com/api.php/4107707049256258/search/" + input.trim()
  );
  xhrRequest.send();
}
function clearList() {
  if (suggestList.hasChildNodes()) {
    while (suggestList.firstChild) {
      suggestList.removeChild(suggestList.firstChild);
    }
  }
}
document.getElementById("btn-search").onclick = showHero;
function showHero() {
  if (id === undefined) {
    return;
  }
  document.getElementById("superHero").value = "";
  window.open("hero.html?id=" + id, "blank");
}

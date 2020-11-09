var arr = JSON.parse(localStorage.getItem("id") || "[]");
console.log(arr);

for (let id of arr) {
  fetch("https://www.superheroapi.com/api.php/4107707049256258/" + id)
    .then((res) => res.json())
    .then((data) => createCards(data, id))
    .catch((err) => console.log(err));
}

function createCards(data, id) {
  var parent = document.createElement("div");
  parent.classList.add("card");
  parent.setAttribute("id", Date.now());
  var image = document.createElement("img");
  image.setAttribute("src", data.image.url);
  parent.appendChild(image);
  var child = document.createElement("div");
  child.classList.add("card-body");

  var h3 = document.createElement("h3");
  h3.classList.add("card-title");
  h3.innerText = data.name;
  child.appendChild(h3);

  var details = document.createElement("a");
  details.classList.add("btn");
  details.classList.add("btn-success");
  details.classList.add("m-4");
  var linkText = document.createTextNode("Details");
  details.appendChild(linkText);
  details.title = "Show Hero Details";
  details.setAttribute("href", "hero.html?id=" + data.id);
  child.appendChild(details);

  var remove = document.createElement("a");
  remove.classList.add("btn");
  remove.classList.add("btn-danger");
  remove.classList.add("m-4");
  var linkText = document.createTextNode("Delete");
  remove.appendChild(linkText);
  remove.title = "Remove From Favourite";

  remove.addEventListener("click", function (ev) {
    console.log(arr);
    //var id =this.id;
    //console.log('id');
    console.log(data.id);
    removeHero(arr, id);
  });
  child.appendChild(remove);
  parent.appendChild(child);

  document.getElementById("card-container").appendChild(parent);
}

function removeHero(arr, value) {
  console.log(value);
  console.log(parent);
  var i = arr.length;
  while (i--) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    }
  }
  if (arr.length == 0) {
    localStorage.removeItem("id");
  }
  window.localStorage.setItem("id", JSON.stringify(arr));
  document.getElementById("card-container").innerHTML = "";
  for (let id of arr) {
    fetch("https://www.superheroapi.com/api.php/2094240747374418/" + id)
      .then((res) => res.json())
      .then((data) => createCards(data, id))
      .catch((err) => console.log(err));
  }
}

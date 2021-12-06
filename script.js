window.onload = window.localStorage.clear();

function add() {
  reset();
  let gender = document.getElementById("gender").value;
  let count = document.getElementById("count").value
  let usersDiv = document.getElementById("users")
  let filter = document.getElementById("filter")
  let storageCount = +localStorage.length
  let limit = +storageCount + +count
  let filterCity = document.getElementById("filterCity")
  
  if (count <= 0 || count == "") {
    alert("Enter the correct number of users to add.")
    reset()
    return 0;
  }

  $.ajax({
    url: 'https://randomuser.me/api/?gender=' + gender + '&results=' + limit + '&nat=IE',
    dataType: 'json',
    success: function (data) {
      for (let i = storageCount; i < limit; i++) {
        let user = {
          id: i + 1,
          title: data.results[i].name.title,
          firstName: data.results[i].name.first,
          lastName: data.results[i].name.last,
          gender: data.results[i].gender,
          age: data.results[i].dob.age,
          city: data.results[i].location.city,
          picture: data.results[i].picture.large,
          salt: data.results[i].login.salt
        }

        localStorage.setItem("user " + i, JSON.stringify(user)) || {};

        let storageUser = JSON.parse(localStorage.getItem("user " + i))

        usersDiv.innerHTML += (`<div class="card m-2" style="width: 14rem;">
      <img src="` + storageUser.picture + `" class="card-img-top">
      <div class="card-body">
        <h6 class="card-title">` + storageUser.title + `. ` + storageUser.firstName + ` ` + storageUser.lastName + `</h6>
        <h6>` + storageUser.age + `</h6>
        <p id="city" class="card-text">` + storageUser.city + `</p>
      </div>
    </div>`)
        if (!document.getElementById(storageUser.city)) {
          filterCity.innerHTML += `<option id="` + storageUser.city + `" value="` + storageUser.city + `">` + storageUser.city + `</option>`
        }
      }
    }
  });
  filter.setAttribute("style", "dispylay:unset")
}

function filter() {
  let usersDiv = document.getElementById("users")
  let filterCity = document.getElementById("filterCity").value
  let minAge = document.getElementById("minAge").value
  let maxAge = document.getElementById("maxAge").value

  usersDiv.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let storageUser = JSON.parse(localStorage.getItem("user " + i))
    let storageUserAge = storageUser.age
    let storageUserCity = storageUser.city

    if (minAge == "" || maxAge == "" || minAge <= 0 || maxAge <= 0) {
      alert("Please enter the filter age correctly.")
      reset()
      return 0;
    } else if ((filterCity == "any") && (storageUserAge > minAge && storageUserAge < maxAge)) {
      usersDiv.innerHTML += (`<div class="card m-2" style="width: 14rem;">
      <img src="` + storageUser.picture + `" class="card-img-top" alt="">
      <div class="card-body">
        <h6 class="card-title">` + storageUser.title + `. ` + storageUser.firstName + ` ` + storageUser.lastName + `</h6>
        <h6>` + storageUser.age + `</h6>
        <p id="city" class="card-text">` + storageUser.city + `</p>
      </div>
    </div>`)
    } else if (storageUserAge > minAge && storageUserAge < maxAge && filterCity == storageUserCity) {
      usersDiv.innerHTML += (`<div class="card m-2" style="width: 14rem;">
      <img src="` + storageUser.picture + `" class="card-img-top" alt="">
      <div class="card-body">
        <h6 class="card-title">` + storageUser.title + `. ` + storageUser.firstName + ` ` + storageUser.lastName + `</h6>
        <h6>` + storageUser.age + `</h6>
        <p id="city" class="card-text">` + storageUser.city + `</p>
      </div>
    </div>`)
    }
  }
}

function reset() {

  document.getElementById("minAge").value = 1
  document.getElementById("maxAge").value = 100
  document.getElementById("filterCity").selectedIndex = 0

  let usersDiv = document.getElementById("users")

  usersDiv.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let storageUser = JSON.parse(localStorage.getItem("user " + i))

    usersDiv.innerHTML += (`<div class="card m-2" style="width: 14rem;">
      <img src="` + storageUser.picture + `" class="card-img-top" alt="...">
      <div class="card-body">
      <h6 class="card-title">` + storageUser.title + `. ` + storageUser.firstName + ` ` + storageUser.lastName + `</h6>
      <h6>` + storageUser.age + `</h6>
        <p id="city" class="card-text">` + storageUser.city + `</p>
      </div>
    </div>`)

  }
}
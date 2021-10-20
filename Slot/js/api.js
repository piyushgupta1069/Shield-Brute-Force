var date = new Date;
var d = date.getDate();
var m = date.getMonth() + 1;
var y = date.getFullYear();
var lat;
var lon;

var Sdate = `${d}-${m}-${y}`;

const api = new XMLHttpRequest();
var centers = new Array;

function ByPinCode(pin) {
    console.log(pin);
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${Sdate}`

    api.open('GET', url, true);

    api.onload = function () {
        if (this.status == 200) {
            SetLocation(this.responseText);
        } else {
            console.log("Not found");
            errorapi();
        }
    }

    api.send();
}

function ByDistrictCode(disid) {
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${disid}&date=${Sdate}`
    api.open('GET', url, true);

    api.onload = function () {
        if (this.status == 200) {
            SetLocation(this.responseText);
            // console.log(this.responseText);
        } else {
            console.log("Not found");
            errorapi()
        }
    }

    api.send();
}

function SetLocation(element) {
    console.log(JSON.parse(element).sessions.length);
    if (JSON.parse(element).sessions == 0) { errorData(); }
    else {
        findData();
    }
    JSON.parse(element).sessions.forEach(ele => {
        var center = [ele["name"], ele["available_capacity_dose1"],
        ele["available_capacity_dose2"], ele["min_age_limit"], ele["state_name"],
        ele["district_name"], ele["slots"], ele["vaccine"], ele["address"]]
        centers.push(center);
    });
    // console.log(centers);
    createslot();
}

var SUB = document.querySelector('.SUBMIT');

function createslot() {
    // console.log("f");
    var html = "";
    centers.forEach(function (e) {
        html += `<div class="col">
        <div class="card h-100">
        <div class="card-header">
        <h5 class="card-title">${e[0]}</h5>
        <p class="card-text">${e[5]}, ${e[4]}</p>
        </div>
        <div class="card-body">
        <table class="table table-striped">
        <tr><td>Age limit</td><td>-</td><td>${e[3]}+</td></tr>
        <tr><td>Dose1 (Available)</td><td>-</td><td>${e[1]}</td></tr>
        <tr><td>Dose2 (Available)</td><td>-</td><td>${e[2]}</td></tr>
        <tr><td>Vaccine</td><td>-</td><td>${e[7]}</td></tr>
        </td></tr>
        </table>
        </div>
        <div class="card-footer">
        <p class="card-text" >Available Slot</p>
        <table class="table table-striped">
        <tr><td>${e[6][0]}</td><td>${e[6][1]}</td></tr>
        <tr><td>${e[6][2]}</td><td>${e[6][3]}</td></tr>
                        </table>
        <small class="text-muted">Address : ${e[8]}</small>
        </div>
        </div>
        </div>`;
    });
    var CEN_DIS = document.querySelector('.CENTERS');
    CEN_DIS.innerHTML = html;
    centers = new Array;
}

var disid;
function SlotD(id) {
    disid = id;
}
function Bydis() {
    ByDistrictCode(disid);
}

function Bypin() {
    var pin = document.querySelector(".pin");
    ByPinCode(pin.value)
}

function errorData() {
    var eHtml = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>DATA NOT FOUND</strong>.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

    var er = document.querySelector(".notice");
    er.innerHTML = eHtml;
    setTimeout(() => {
        er.innerHTML = "";
    }, 3000);
}

function errorapi() {
    var eHtml = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Invalid Address/Pincode</strong>.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

    var er = document.querySelector(".notice");
    er.innerHTML = eHtml;
    setTimeout(() => {
        er.innerHTML = "";
    }, 3000);
}

function findData() {
    var eHtml = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Center Found</strong>.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

    var er = document.querySelector(".notice");
    er.innerHTML = eHtml;
    setTimeout(() => {
        er.innerHTML = "";
    }, 10000);
}

var latlon = "";
function showPostion(position) {
    console.log(position.coords.latitude.toFixed(2));
    console.log(position.coords.longitude.toFixed(2));
    lat = position.coords.latitude.toFixed(2);
    lon = position.coords.longitude.toFixed(2);
    Bymap();
}

function showError(error) {
    var eHtml = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Location Not Found</strong>.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

    var er = document.querySelector(".notice");
    er.innerHTML = eHtml;
    setTimeout(() => {
        er.innerHTML = "";
    }, 5000);    
}

function map() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPostion, showError);
    } else {
        errorapi();
    }
}

function Bymap() {
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${lat}&long=${lon}`;
    api.open('GET', url, true);

    api.onload = function () {
        if (this.status == 200) {
            SetLocationmap(this.responseText);
        } else {
            console.log("Not found");
            errorapi();
        }
    }

    api.send();
}

function SetLocationmap(element) {
    if (JSON.parse(element).centers == 0) { errorData(); }
    else {
        findData();
    }
    JSON.parse(element).centers.forEach(ele => {
        var center = [ele["name"],
         ele["state_name"],
        ele["district_name"], ele["pincode"], ele["location"]]
        centers.push(center);
    });
    createslotmap();
}

function createslotmap() {
    var html = "";
    centers.forEach(function (e) {
        html += `<div class="col">
        <div class="card h-auto">
        <div class="card-header">
        <h5 class="card-title">${e[0]}</h5>
        <p class="card-text">${e[2]}, ${e[1]}</p>
        <p class="card-text">PIN CODE : ${e[3]}</p>
        <small class="text-muted"><strong>Address :</strong>${e[4]}</small>
        </div>
        </div>
        </div>`;
    });
    var CEN_DIS = document.querySelector('.CENTERS');
    CEN_DIS.innerHTML = html;
    centers = new Array;
}

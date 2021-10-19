// ******FOR STATE ID****** 

const statesapi = new XMLHttpRequest();
var States = new Array;

const url = `https://cdn-api.co-vin.in/api/v2/admin/location/states`;

statesapi.open('GET', url, true);

statesapi.onload = function () {
    if (this.status == 200) {
        Set_Id(this.responseText);
    } else {
        console.log("Not found");
    }
}

statesapi.send();

function Set_Id(element) {
    JSON.parse(element).states.forEach(ele => {
        var state = [ele["state_id"], ele["state_name"]];
        States.push(state);
    });
    s();
}

function s() {
    var Shtml = `<option>Select State</option>`;
    States.forEach(function (e) {
        Shtml += `<option value="${e[0]}">${e[1]}</option>`
    });

    var st = document.querySelector('.state');
    st.innerHTML = Shtml;
}

// *****FOR DISTRICT ID*****

function dis_tab(id) {
    const districtapi = new XMLHttpRequest();
    var districts = new Array;

    const url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`;

    districtapi.open('GET', url, true);

    districtapi.onload = function () {
        if (this.status == 200) {
            Set_IdD(this.responseText);
        } else {
            console.log("Not found");
        }
    }

    districtapi.send();

    function Set_IdD(element) {
        JSON.parse(element).districts.forEach(ele => {
            var district = [ele["district_id"], ele["district_name"]];
            districts.push(district);
        });
        dt();
    }

    function dt() {
        var Dhtml = `<option>Select District</option>`;
        districts.forEach(function (e) {
            Dhtml += `<option value="${e[0]}">${e[1]}</option>`
        });

        var dis = document.querySelector('.district');
        dis.innerHTML = Dhtml;
    }
}
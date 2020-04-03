function useData(method, url, data) {
    return axios({
        method,
        url,
        data
    }).catch(function(err) {
        console.log("Err", err);
    })
}

function addChild(data) {
    var totalCases = 0,
        totalDeaths = 0,
        totalRecovered = 0;
    var tbody = document.createElement("tbody");
    data.sort(function(a, b) {
        return b.cases - a.cases;
    })

    var tr = document.createElement('tr');
    data.forEach((item, index) => {
        var { cases, deaths, recovered, country, countryInfo } = item;

        totalCases += cases;
        totalDeaths += deaths;
        totalRecovered += recovered;

        var tr = document.createElement('tr');
        tr.innerHTML = `<td>${index+1}</td><td>${country}</td><td><img src="${countryInfo.flag}"/></td><td>${cases}</td><td>${deaths}</td><td>${recovered}</td>`
        tbody.appendChild(tr);
    })

    document.getElementById("cases").textContent = totalCases;
    document.getElementById("deaths").textContent = totalDeaths;
    document.getElementById("recovered").textContent = totalRecovered;

    return tbody;
}

useData("GET", "https://corona.lmao.ninja/countries", null).then(function(res) {
    document.getElementById("table").appendChild(addChild(res.data));

})
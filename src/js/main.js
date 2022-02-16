import  { 
    allGlobalData, getVaccinatedToday, getAllCountryCase,
} from './data.js'

const showNavbar = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
  
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navigation.classList.toggle('active');
    });
};

const showGlobalCase = async() => {
    const totalGlobalCase = document.querySelector('.confirmed-cases');
    const activeGlobalCase = document.querySelector('.active-case');
    const recoveredGlobalCase = document.querySelector('.recovered-case');
    const deathGlobalCase = document.querySelector('.death-case');

    const todayGlobalCase = document.querySelector('.today-global-case');
    const todayGlobalRecovered = document.querySelector('.today-global-recovered');
    const todayGlobalDeath = document.querySelector('.today-global-death');
    const todayGlobalVaccinated = document.querySelector('.today-global-vaccinated');

    const {
        active, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered,
    } = await allGlobalData();
    const vaccinatedCases = await getVaccinatedToday();
    const lastVaccinatedCases = Object.values(vaccinatedCases)[Object.values(vaccinatedCases).length-1]

    totalGlobalCase.innerHTML = cases.toLocaleString("id-ID");
    activeGlobalCase.innerHTML = active.toLocaleString("id-ID");
    recoveredGlobalCase.innerHTML = recovered.toLocaleString("id-ID");
    deathGlobalCase.innerHTML = deaths.toLocaleString("id-ID");

    todayGlobalCase.innerHTML = todayCases.toLocaleString("id-ID");
    todayGlobalRecovered.innerHTML = todayRecovered.toLocaleString("id-ID");
    todayGlobalDeath.innerHTML = todayDeaths.toLocaleString("id-ID");
    todayGlobalVaccinated.innerHTML = lastVaccinatedCases.toLocaleString("id-ID");
    
};

const renderTable = async() => {
    const container = document.querySelector('.table-row-case');
    let htmlContainer = '';
    const req = await getAllCountryCase();
    req.map((data) => {
        htmlContainer += `
        <tr>
            <td><img class="img-flag" src=${data.countryInfo.flag} alt=${data.country}> ${data.country}</td>
            <td>${data.cases}</td>
            <td>${data.active}</td>
            <td>${data.recovered}</td>
            <td>${data.deaths}</td>
            <td>${data.todayCases}</td>
            <td>${data.todayRecovered}</td>
            <td>${data.todayDeaths}</td>
        </tr>`
        return htmlContainer;
    })
    container.innerHTML = htmlContainer;
}
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

document.addEventListener('DOMContentLoaded', async() => {
    showNavbar();
    await showGlobalCase();
    const p = await getVaccinatedToday()
   console.log(Object.values(p)[Object.values(p).length-1])
   renderTable()
});

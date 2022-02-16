const base_url = "https://disease.sh/v3/covid-19";

export const allGlobalData = async() => {
    const res = await fetch(`${base_url}/all`);
    const { 
        active, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, 
    } = await res.json();
    return { 
        active, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered,
    };
};

export const getVaccinatedToday = async() => {
    const req = await fetch(`${base_url}/vaccine/coverage`);
    const res = await req.json();
    return res;
};

export const getAllCountryCase = async() => {
    const req = await fetch(`${base_url}/countries`);
    const res = await req.json();
    return res;
};
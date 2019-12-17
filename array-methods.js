const forecast = [
    {"date": 1572548400000, "temp": -5.376962644798931},
    {
    "date": 1572634800000,
    "temp": 20.429103333338176
},
    {"date": 1572721200000, "temp": -0.765750606470105},
    {
    "date": 1572807600000,
    "temp": 19.38220822662013
},
    {"date": 1572894000000, "temp": 7.255153151559252},
    {
    "date": 1572980400000,
    "temp": 16.693798062339003
},
    {"date": 1573066800000, "temp": 7.7597326187313875},
    {
    "date": 1573153200000,
    "temp": 1.1780098977453104
},
    {"date": 1573239600000, "temp": 11.83224207845931},
    {
    "date": 1573326000000,
    "temp": 32.45046674619782
},
    {"date": 1573412400000, "temp": 22.22537131858561},
    {
    "date": 1573498800000,
    "temp": -0.9725978829427007
},
    {"date": 1573585200000, "temp": 13.039473538517612},
    {
    "date": 1573671600000,
    "temp": 14.264354854815068
},
    {"date": 1573758000000, "temp": 13.57904117848453},
    {
    "date": 1573844400000,
    "temp": 9.967656393718059
},
    {"date": 1573930800000, "temp": -0.811675006286988}, {
    "date": 1574017200000,
    "temp": -1.5475846039298808
}, {"date": 1574103600000, "temp": 7.756760640667842}, {
    "date": 1574190000000,
    "temp": 6.728472729107853
}, {"date": 1574276400000, "temp": 1.936037203828489}, {
    "date": 1574362800000,
    "temp": -3.560982692357408
}, {"date": 1574449200000, "temp": -2.1257685750539332}, {
    "date": 1574535600000,
    "temp": 9.686988478818865
}, {"date": 1574622000000, "temp": -0.810591751444175}, {
    "date": 1574708400000,
    "temp": 27.742994998468397
}, {"date": 1574794800000, "temp": null}, {
    "date": 1574881200000,
    "temp": 11.577688798151275
}, {"date": 1574967600000, "temp": 25.16417170587149}, {
    "date": 1575054000000,
    "temp": 9.311657778350853
}];

/**
 * Draws forecast in unordered list
 * @param list - Forecast
 */
function drawTempsList(list) {
    const $listElement = document.querySelector('#forecast');
    $listElement.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        const {temp, date} = list[i];
        const fixed = temp.toFixed();
        $listElement.innerHTML += `<li>${new Date(date).toLocaleDateString()} : ${fixed} °C</li>`;
    }
}

/**
 * Filter function for filtering between two dates for prop name
 * @param propName - The name of the property for iterated element
 * @returns {function(*, *): function(*): boolean|boolean}
 * @example Filter temperatures for property date in between two dates
 * const filterBetweenDatesForDate = filterBetweenDates('date');
 * const weatherList = [{"date": 1572548400000, "temp": -5.376962644798931}, {"date": 1572634800000, "temp": 20.429103333338176}];
 * const filteredWeatherList = weatherList.filter(filterBetweenDatesForDate(new Date().getTime(), new Date().getTime()));
 *
 */
function filterBetweenDates(propName) {
    /**
     * Filter function for filtering element dates by property name
     * @param from - Amount of milliseconds
     * @param to- Amount of milliseconds
     * @returns {function(*): boolean|boolean}
     */
    function filterBetweenDates(from, to) {
        return function (element) {
            return element[propName] >= from && element[propName] <= to;
        }
    }
    return filterBetweenDates;
}

/**
 * Filter form change handler, Filter
 * @param event - Form change event.
 */
function handleFiltered(event) {
    event.preventDefault();
    const {currentTarget: {from: {value: fromDateValue}, to: {value: toDateValue}}} = event;
    if (fromDateValue && toDateValue) {
        const from = new Date(fromDateValue);
        from.setHours(0, 0, 0, 0);
        const to = new Date(toDateValue);
        to.setHours(0, 0, 0, 0);
        const tempsInBetweenDates = forecast.filter(filterBetweenDatesForDate);
        drawTempsList(tempsInBetweenDates);
    }
}

const filterBetweenDatesForDate = filterBetweenDates('date');
const $form = document.querySelector('form');

$form.addEventListener('submit', handleFiltered);

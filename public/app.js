let date = new Date();
let d = date.getDate();
let m =  date.getMonth() + 1;
let y = date.getFullYear();
let getWeekday = new Array(7);
getWeekday[0] = 'Sunnuntai';
getWeekday[1] = 'Maanantai';
getWeekday[2] = 'Tiistai';
getWeekday[3] = 'Keskiviikko';
getWeekday[4] = 'Torstai';
getWeekday[5] = 'Perjantai';
getWeekday[6] = 'Lauantai';
let weekday = getWeekday[date.getDay()]
let myrtsi = 16365;
let data = [];
let menu = 'https://cors-anywhere.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/' + myrtsi + '/' + y + '/' + '0' + m + '/' + d + '/fi';
console.log(y, '0' + m, d);
const getMenu =()=> {
    fetch(menu,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            fixData(json);
        })
        .catch(e => console.log(e));
};

const fixData = (menuJson) => {
    let today = document.createElement('strong');
    document.getElementById('get-date').appendChild(today);
    let thisDay = weekday + ' ' + d + '.' + m + '.' + y;
    today.innerHTML = thisDay;

    let menu=  '';
    menu = menuJson.courses.forEach((t) => data.push({name: t.title_fi, allergenes: t.properties, price: t.price}));
    console.log(data);
    const createMenu = document.getElementById('sodexo-menu');
    createMenu.innerHTML = data.map(({name, allergenes, price}) => `
            <div>
               <p>${name}</p>
               <div>
                  <p>${price}</p>
                  <p>${ allergenes === undefined ? '' : allergenes}</p>
               </div>
               </div>
`).join('');

};
getMenu();

const place_name = 'Омск'
const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

fetch(API_URL_GEO_DATA)
    .then((response) => {
        return response.json()
    }).then((data) => {
        let coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
        const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`
         if (coordinates) {
             fetch(API_OPEN_METEO).then((response) => {
                 return response.json()
             }).then((data) => {
                 let parent = document.getElementById('air-pollution')
                 if (parent) {
                     let table = document.createElement('table')
                     table.classList.add('table')
                     table.classList.add('m-3')
                     table.classList.add('caption-top')
                     let caption = document.createElement('caption')
                     caption.appendChild(document.createTextNode(`Статистика по загрязнению окружающей среды в ${place_name}`))
                     table.appendChild(caption)
                     let header = document.createElement('tr')
                     table.appendChild(header)
                     for (const i in data.hourly_units) {
                         let th = document.createElement('th')
                         th.appendChild(document.createTextNode(i+'['+data.hourly_units[i]+']'))
                         header.appendChild(th)
                     }
                     for (let i = 0;i < 20; i++) {
                         let row = document.createElement('tr')
                         const td1 = document.createElement('th');
                         let date = Date(data.hourly.time[i]).toString()
                         td1.appendChild(document.createTextNode(date))
                         const td2 = document.createElement('td');
                         td2.appendChild(document.createTextNode(data.hourly.pm10[i]))
                         const td3 = document.createElement('td');
                         td3.appendChild(document.createTextNode(data.hourly.pm2_5[i]))
                         row.appendChild(td1)
                         row.appendChild(td2)
                         row.appendChild(td3)
                         table.appendChild(row)
                     }
                     parent.appendChild(table)
                 }
             })
         }
})

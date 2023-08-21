const place_name = 'Москва'
const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

fetch(API_URL_GEO_DATA).then((response) => {
        return response.json()
    }).then(function (data) {
        let a = document.getElementById('air-pollution')
        if (a){
            a.appendChild(document.createTextNode(data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text))
        }
    })


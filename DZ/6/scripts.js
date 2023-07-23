const place_name = 'Москва'
const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

const getLineData = (initialData, lengthOfDataChunks) => {
    const numOfChunks = Math.ceil(initialData.length / lengthOfDataChunks);
    const dataChunks = [];

    for (var i = 0; i < numOfChunks; i++) dataChunks[i] = [];

    initialData.forEach((entry, index) => {
        const chunkNumber = Math.floor(index / lengthOfDataChunks);
        dataChunks[chunkNumber]
        dataChunks[chunkNumber].push(entry);
    });

    const averagedChunks = dataChunks.map(chunkEntry => {
        const sumArray = (accumulator, currentValue) => accumulator + currentValue;
        const chunkAverage = chunkEntry.reduce(sumArray) / lengthOfDataChunks;
        return chunkEntry.map(chunkEntryValue => chunkAverage);
    });

    return averagedChunks.flat();
}

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
            console.log(data)
            const canvas = document.getElementById('canvas')
            const isoTime = data.hourly.time;
            const pm10 = data.hourly.pm10;
            const pm2_5 = data.hourly.pm2_5;
            const averagePM10 = pm10.reduce((acc, number) => acc+number, 0)/pm10.length;
            const lineDataPM10 = getLineData(pm10, 120);
            const lineDataPM2_5 = getLineData(pm2_5, 120);
            console.log(averagePM10)
            if (canvas) {
                new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: isoTime.map((item) => new Date(item)),
                        datasets: [
                            {
                                label: 'PM2_5',
                                data: data.hourly.pm2_5,
                                borderWidth: 1,
                                borderColor: "#7375D8",
                            },
                            {
                                label: 'PM10',
                                data: data.hourly.pm10,
                                borderWidth: 1,
                                borderColor: "#FF7373",
                            },
                            {
                                label: 'Среднее значение за сутки параметра PM10',
                                data: lineDataPM10,
                                type: 'line',
                                borderColor: "#A60000",
                                fill: false,
                                borderWidth: 1,
                                order: 1
                            },
                            {
                                label: 'Среднее значение за сутки параметра PM2_5',
                                data: lineDataPM2_5,
                                type: 'line',
                                borderColor: "#080B74",
                                fill: false,
                                borderWidth: 1,
                                order: 1
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: `Статистика по загрязнению воздуха в ${place_name}`
                            }
                        }
                    }
                });
            }
        })
    }
})

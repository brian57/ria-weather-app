import { ref } from 'vue'
import { defineStore } from 'pinia'

// TODO: store in env
const API_KEY = '482944e26d320a80bd5e4f23b3de7d1f'

export const useWeatherStore = defineStore('weather', () => {
  const remainingHoursData = ref([])
  const weekData = ref([])
  const loading = ref(false)
  const lastUpdated = ref(new Date())

  async function fetchWeatherData(lat, lon) {
    loading.value = true
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lon=${lon}&appid=${API_KEY}&lat=${lat}`
    ).then((res) => res.json())
    loading.value = false

    // parse data for today:
    let today = new Date()
    lastUpdated.value = today
    let dayData = {}

    for (const w of response.list) {
      var date = new Date(`${w.dt_txt} UTC`)
      if (today.getDate() == date.getDate()) {
        remainingHoursData.value.push({
          date: date,
          temp: w.main.temp,
          humidity: w.main.humidity,
          weather: w.weather
        })
      } else {
        const offset = date.getTimezoneOffset()
        const dateInTZ = new Date(date.getTime() - offset * 60 * 1000)
        const dayKey = dateInTZ.toISOString().split('T')[0]
        const dataPoint = {
          temp: w.main.temp,
          weather: w.weather,
          clouds: w.clouds.all
        }
        dayData[dayKey] ? dayData[dayKey].push(dataPoint) : (dayData[dayKey] = [dataPoint])
      }
    }

    weekData.value = Object.entries(dayData).map(([key, value]) => ({
      date: key,
      low: value.reduce((cur, d) => Math.min(cur, d.temp), Number.MAX_SAFE_INTEGER),
      high: value.reduce((cur, d) => Math.max(cur, d.temp), 0),
      clouds: value.reduce((cur, d) => Math.max(cur, d.clouds), 0),
      icon: value.reduce(
        (cur, d) => (d.clouds >= cur[0] ? [d.clouds, d.weather[0].icon] : cur),
        [0, '']
      )[1],
      description: value.reduce(
        (cur, d) => (d.clouds >= cur[0] ? [d.clouds, d.weather[0].description] : cur),
        [0, '']
      )[1]
    }))
  }

  return {
    fetchWeatherData,
    remainingHoursData,
    weekData,
    loading,
    lastUpdated
  }
})

async function fetchData(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lon=${lon}&appid=${API_KEY}&lat=${lat}`
  )
  return await response.json()
}

function getResponse() {
  return {
    cod: '200',
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1717297200,
        main: {
          temp: 291.89,
          feels_like: 291.62,
          temp_min: 290.96,
          temp_max: 291.89,
          pressure: 1014,
          sea_level: 1014,
          grnd_level: 992,
          humidity: 69,
          temp_kf: 0.93
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n'
          }
        ],
        clouds: {
          all: 50
        },
        wind: {
          speed: 2.46,
          deg: 216,
          gust: 2.1
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-02 03:00:00'
      },
      {
        dt: 1717308000,
        main: {
          temp: 290.63,
          feels_like: 290.29,
          temp_min: 289.76,
          temp_max: 290.63,
          pressure: 1014,
          sea_level: 1014,
          grnd_level: 994,
          humidity: 71,
          temp_kf: 0.87
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n'
          }
        ],
        clouds: {
          all: 25
        },
        wind: {
          speed: 3.54,
          deg: 149,
          gust: 3.51
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-02 06:00:00'
      },
      {
        dt: 1717318800,
        main: {
          temp: 288.6,
          feels_like: 288.19,
          temp_min: 288.6,
          temp_max: 288.6,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 993,
          humidity: 76,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n'
          }
        ],
        clouds: {
          all: 28
        },
        wind: {
          speed: 2.26,
          deg: 125,
          gust: 2.79
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-02 09:00:00'
      },
      {
        dt: 1717329600,
        main: {
          temp: 288.53,
          feels_like: 288.06,
          temp_min: 288.53,
          temp_max: 288.53,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 993,
          humidity: 74,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n'
          }
        ],
        clouds: {
          all: 30
        },
        wind: {
          speed: 0.88,
          deg: 168,
          gust: 1.09
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-02 12:00:00'
      },
      {
        dt: 1717340400,
        main: {
          temp: 289.8,
          feels_like: 289.3,
          temp_min: 289.8,
          temp_max: 289.8,
          pressure: 1013,
          sea_level: 1013,
          grnd_level: 993,
          humidity: 68,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: {
          all: 22
        },
        wind: {
          speed: 1.84,
          deg: 194,
          gust: 0.87
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-02 15:00:00'
      },
      {
        dt: 1717351200,
        main: {
          temp: 293.63,
          feels_like: 293.09,
          temp_min: 293.63,
          temp_max: 293.63,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 993,
          humidity: 52,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        clouds: {
          all: 45
        },
        wind: {
          speed: 3.33,
          deg: 205,
          gust: 1.64
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-02 18:00:00'
      },
      {
        dt: 1717362000,
        main: {
          temp: 296.58,
          feels_like: 296.08,
          temp_min: 296.58,
          temp_max: 296.58,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 992,
          humidity: 42,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 61
        },
        wind: {
          speed: 4.3,
          deg: 203,
          gust: 2.4
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-02 21:00:00'
      },
      {
        dt: 1717372800,
        main: {
          temp: 296.12,
          feels_like: 295.62,
          temp_min: 296.12,
          temp_max: 296.12,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 991,
          humidity: 44,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        clouds: {
          all: 47
        },
        wind: {
          speed: 4.18,
          deg: 223,
          gust: 2.28
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-03 00:00:00'
      },
      {
        dt: 1717383600,
        main: {
          temp: 292.92,
          feels_like: 292.41,
          temp_min: 292.92,
          temp_max: 292.92,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 992,
          humidity: 56,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 2.02,
          deg: 201,
          gust: 1.88
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-03 03:00:00'
      },
      {
        dt: 1717394400,
        main: {
          temp: 291.3,
          feels_like: 290.84,
          temp_min: 291.3,
          temp_max: 291.3,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 993,
          humidity: 64,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 71
        },
        wind: {
          speed: 2.01,
          deg: 174,
          gust: 1.85
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-03 06:00:00'
      },
      {
        dt: 1717405200,
        main: {
          temp: 290.16,
          feels_like: 289.72,
          temp_min: 290.16,
          temp_max: 290.16,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 992,
          humidity: 69,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.21,
          deg: 151,
          gust: 1.98
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-03 09:00:00'
      },
      {
        dt: 1717416000,
        main: {
          temp: 289.46,
          feels_like: 289.1,
          temp_min: 289.46,
          temp_max: 289.46,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 992,
          humidity: 75,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02n'
          }
        ],
        clouds: {
          all: 23
        },
        wind: {
          speed: 1.78,
          deg: 171,
          gust: 1.58
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-03 12:00:00'
      },
      {
        dt: 1717426800,
        main: {
          temp: 290.7,
          feels_like: 290.31,
          temp_min: 290.7,
          temp_max: 290.7,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 993,
          humidity: 69,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 74
        },
        wind: {
          speed: 1.9,
          deg: 187,
          gust: 1.18
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-03 15:00:00'
      },
      {
        dt: 1717437600,
        main: {
          temp: 295.7,
          feels_like: 295.29,
          temp_min: 295.7,
          temp_max: 295.7,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 992,
          humidity: 49,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        clouds: {
          all: 39
        },
        wind: {
          speed: 3.17,
          deg: 225,
          gust: 2.47
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-03 18:00:00'
      },
      {
        dt: 1717448400,
        main: {
          temp: 297.41,
          feels_like: 297.07,
          temp_min: 297.41,
          temp_max: 297.41,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 45,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 9
        },
        wind: {
          speed: 5.49,
          deg: 230,
          gust: 3.26
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-03 21:00:00'
      },
      {
        dt: 1717459200,
        main: {
          temp: 295.87,
          feels_like: 295.53,
          temp_min: 295.87,
          temp_max: 295.87,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 51,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        clouds: {
          all: 36
        },
        wind: {
          speed: 4.09,
          deg: 225,
          gust: 2.93
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-04 00:00:00'
      },
      {
        dt: 1717470000,
        main: {
          temp: 294.24,
          feels_like: 293.89,
          temp_min: 294.24,
          temp_max: 294.24,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 57,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 75
        },
        wind: {
          speed: 2.53,
          deg: 207,
          gust: 1.8
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-04 03:00:00'
      },
      {
        dt: 1717480800,
        main: {
          temp: 292.53,
          feels_like: 292.19,
          temp_min: 292.53,
          temp_max: 292.53,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 990,
          humidity: 64,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 87
        },
        wind: {
          speed: 2.24,
          deg: 161,
          gust: 2.05
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-04 06:00:00'
      },
      {
        dt: 1717491600,
        main: {
          temp: 291.83,
          feels_like: 291.48,
          temp_min: 291.83,
          temp_max: 291.83,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 66,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 1.78,
          deg: 178,
          gust: 1.83
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-04 09:00:00'
      },
      {
        dt: 1717502400,
        main: {
          temp: 290.88,
          feels_like: 290.56,
          temp_min: 290.88,
          temp_max: 290.88,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 989,
          humidity: 71,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 92
        },
        wind: {
          speed: 1.72,
          deg: 173,
          gust: 1.77
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-04 12:00:00'
      },
      {
        dt: 1717513200,
        main: {
          temp: 292.36,
          feels_like: 292.06,
          temp_min: 292.36,
          temp_max: 292.36,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 66,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 66
        },
        wind: {
          speed: 1.65,
          deg: 203,
          gust: 0.78
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-04 15:00:00'
      },
      {
        dt: 1717524000,
        main: {
          temp: 297.12,
          feels_like: 296.83,
          temp_min: 297.12,
          temp_max: 297.12,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 48,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 79
        },
        wind: {
          speed: 3.07,
          deg: 209,
          gust: 1.43
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-04 18:00:00'
      },
      {
        dt: 1717534800,
        main: {
          temp: 301.04,
          feels_like: 300.59,
          temp_min: 301.04,
          temp_max: 301.04,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 38,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 74
        },
        wind: {
          speed: 4.55,
          deg: 210,
          gust: 2.56
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-04 21:00:00'
      },
      {
        dt: 1717545600,
        main: {
          temp: 298.26,
          feels_like: 298.03,
          temp_min: 298.26,
          temp_max: 298.26,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 46,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 76
        },
        wind: {
          speed: 4.02,
          deg: 218,
          gust: 2.78
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-05 00:00:00'
      },
      {
        dt: 1717556400,
        main: {
          temp: 295.82,
          feels_like: 295.55,
          temp_min: 295.82,
          temp_max: 295.82,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 54,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 86
        },
        wind: {
          speed: 2.63,
          deg: 187,
          gust: 1.8
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-05 03:00:00'
      },
      {
        dt: 1717567200,
        main: {
          temp: 293.66,
          feels_like: 293.39,
          temp_min: 293.66,
          temp_max: 293.66,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 991,
          humidity: 62,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 82
        },
        wind: {
          speed: 2.27,
          deg: 165,
          gust: 1.67
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-05 06:00:00'
      },
      {
        dt: 1717578000,
        main: {
          temp: 292.47,
          feels_like: 292.23,
          temp_min: 292.47,
          temp_max: 292.47,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 68,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n'
          }
        ],
        clouds: {
          all: 46
        },
        wind: {
          speed: 1.94,
          deg: 189,
          gust: 1.58
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-05 09:00:00'
      },
      {
        dt: 1717588800,
        main: {
          temp: 291.35,
          feels_like: 291.16,
          temp_min: 291.35,
          temp_max: 291.35,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 74,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 72
        },
        wind: {
          speed: 1.76,
          deg: 186,
          gust: 1.46
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-05 12:00:00'
      },
      {
        dt: 1717599600,
        main: {
          temp: 292.78,
          feels_like: 292.57,
          temp_min: 292.78,
          temp_max: 292.78,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 992,
          humidity: 68,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: {
          all: 57
        },
        wind: {
          speed: 1.53,
          deg: 193,
          gust: 0.57
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-05 15:00:00'
      },
      {
        dt: 1717610400,
        main: {
          temp: 298.34,
          feels_like: 298.14,
          temp_min: 298.34,
          temp_max: 298.34,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 47,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        clouds: {
          all: 32
        },
        wind: {
          speed: 3.24,
          deg: 222,
          gust: 1.75
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-05 18:00:00'
      },
      {
        dt: 1717621200,
        main: {
          temp: 300.06,
          feels_like: 300.1,
          temp_min: 300.06,
          temp_max: 300.06,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 43,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 4.37,
          deg: 233,
          gust: 2.51
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-05 21:00:00'
      },
      {
        dt: 1717632000,
        main: {
          temp: 297.86,
          feels_like: 297.69,
          temp_min: 297.86,
          temp_max: 297.86,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 989,
          humidity: 50,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 4.26,
          deg: 240,
          gust: 2.99
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-06 00:00:00'
      },
      {
        dt: 1717642800,
        main: {
          temp: 294.17,
          feels_like: 293.97,
          temp_min: 294.17,
          temp_max: 294.17,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 63,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.75,
          deg: 231,
          gust: 2.25
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-06 03:00:00'
      },
      {
        dt: 1717653600,
        main: {
          temp: 293.29,
          feels_like: 293.11,
          temp_min: 293.29,
          temp_max: 293.29,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 67,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 1.68,
          deg: 215,
          gust: 1.37
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-06 06:00:00'
      },
      {
        dt: 1717664400,
        main: {
          temp: 292.2,
          feels_like: 292.01,
          temp_min: 292.2,
          temp_max: 292.2,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 71,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n'
          }
        ],
        clouds: {
          all: 1
        },
        wind: {
          speed: 1.39,
          deg: 225,
          gust: 1.15
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-06 09:00:00'
      },
      {
        dt: 1717675200,
        main: {
          temp: 291.73,
          feels_like: 291.55,
          temp_min: 291.73,
          temp_max: 291.73,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 990,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n'
          }
        ],
        clouds: {
          all: 2
        },
        wind: {
          speed: 1.35,
          deg: 249,
          gust: 1.13
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n'
        },
        dt_txt: '2024-06-06 12:00:00'
      },
      {
        dt: 1717686000,
        main: {
          temp: 292.99,
          feels_like: 292.78,
          temp_min: 292.99,
          temp_max: 292.99,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 991,
          humidity: 67,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 1.31,
          deg: 220,
          gust: 0.77
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-06 15:00:00'
      },
      {
        dt: 1717696800,
        main: {
          temp: 297.97,
          feels_like: 297.76,
          temp_min: 297.97,
          temp_max: 297.97,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 991,
          humidity: 48,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 2
        },
        wind: {
          speed: 3.44,
          deg: 231,
          gust: 2.1
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-06 18:00:00'
      },
      {
        dt: 1717707600,
        main: {
          temp: 299.66,
          feels_like: 299.66,
          temp_min: 299.66,
          temp_max: 299.66,
          pressure: 1009,
          sea_level: 1009,
          grnd_level: 991,
          humidity: 43,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 2
        },
        wind: {
          speed: 3.96,
          deg: 236,
          gust: 2.27
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-06 21:00:00'
      },
      {
        dt: 1717718400,
        main: {
          temp: 298.39,
          feels_like: 298.2,
          temp_min: 298.39,
          temp_max: 298.39,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 989,
          humidity: 47,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 2
        },
        wind: {
          speed: 4.76,
          deg: 237,
          gust: 3.34
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd'
        },
        dt_txt: '2024-06-07 00:00:00'
      }
    ],
    city: {
      id: 5368361,
      name: 'Los Angeles',
      coord: {
        lat: 34.0522,
        lon: -118.2437
      },
      country: 'US',
      population: 3792621,
      timezone: -25200,
      sunrise: 1717245760,
      sunset: 1717297170
    }
  }
}

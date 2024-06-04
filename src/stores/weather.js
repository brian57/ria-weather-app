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
    remainingHoursData.value = []
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

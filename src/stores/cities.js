import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', () => {
  async function loadCities() {}

  const selectedCityId = ref(3451190)
  const cities = ref([
    {
      id: 3451190,
      name: 'Rio de Janeiro',
      stateCode: '21',
      countryCode: 'BR',
      countryFull: 'Brazil',
      lat: -22.90278,
      lon: -43.2075
    },
    {
      id: 1816670,
      name: 'Beijing',
      stateCode: '22',
      countryCode: 'CN',
      countryFull: 'Paracel Islands',
      lat: 39.9075,
      lon: 116.39723
    },
    {
      id: 5368361,
      name: 'Los Angeles',
      stateCode: 'CA',
      countryCode: 'US',
      countryFull: 'United States',
      lat: 34.05223,
      lon: -118.24368
    }
  ])

  function setSelected(id) {
    selectedCityId.value = id
  }

  return {
    cities,
    loadCities,
    selectedCityId,
    setSelected
  }
})

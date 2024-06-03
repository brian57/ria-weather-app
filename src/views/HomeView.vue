<script setup>
import { useCitiesStore } from '@/stores/cities'
import { useWeatherStore } from '@/stores/weather'
import { formatDateDay, formatDateHour, formatDate, toF } from '@/utils/tools'

const citiesStore = useCitiesStore()
const weatherStore = useWeatherStore()

function selectCity(id) {
  citiesStore.setSelected(id)
  const current = citiesStore.cities.find((c) => c.id === citiesStore.selectedCityId)
  weatherStore.fetchWeatherData(current.lat, current.lon)
}

selectCity(citiesStore.selectedCityId)
</script>

<template>
  <main>
    <div class="weather-container">
      <div class="app-header">
        <div class="title">Simple Weather</div>
      </div>
      <div class="cities">
        <div
          v-for="city in citiesStore.cities"
          @click="() => selectCity(city.id)"
          :class="{ 'city-tab': true, active: city.id === citiesStore.selectedCityId }"
          :key="city.id"
        >
          {{ city.name }}
        </div>
      </div>
      <div class="weather-content">
        <div v-if="!weatherStore.loading" class="next-hours">
          <div class="section-header">Next Hours</div>
          <div class="next-hours-body">
            <div class="hour-data" v-for="today in weatherStore.remainingHoursData">
              <div>{{ toF(today.temp) }}°</div>
              <div>{{ today.humidity }}%</div>
              <div>
                <img :src="`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`" />
              </div>
              <div>
                {{ formatDateHour(today.date) }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="!weatherStore.loading" class="next-week">
          <div class="section-header">Next 5 Days</div>
          <div class="next-week-body">
            <div class="day" v-for="today in weatherStore.weekData">
              <div>
                <img :src="`https://openweathermap.org/img/wn/${today.icon}@2x.png`" />
              </div>
              <div class="date">
                <div>{{ formatDateDay(new Date(today.date)) }}</div>
                <div>{{ today.description }}</div>
              </div>
              <div class="temp">{{ toF(today.high) }}°</div>
              <div class="temp">{{ toF(today.low) }}°</div>
            </div>
          </div>
        </div>
      </div>
      <div class="last-updated">Last Updated on {{ formatDate(weatherStore.lastUpdated) }}</div>
    </div>
  </main>
</template>

<style scoped>
.weather-container {
  display: flex;
  color: white;
  flex-direction: column;
  height: 100vh;
}

.weather-content {
  flex-grow: 2;
  background: linear-gradient(rgb(10, 74, 123), rgb(19, 140, 174) 75%, rgb(193, 175, 164) 75%);
}

.app-header {
  background-color: rgb(22, 101, 191);
  height: 80px;
  padding: 20px 0 0 15px;
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
}

.cities {
  background-color: white;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 40px;
  color: gray;
  display: flex;
  flex-grow: 0;
}

.city-tab {
  padding: 0 10px;
}

.active {
  color: black;
  border-bottom: 2px solid red;
}

.last-updated {
  flex-grow: 0;
  background-color: rgb(22, 101, 191);
  color: white;
  text-align: right;
  padding-right: 10px;
}

/* Next Hours */
.next-hours {
  background-color: white;
  color: black;
  margin: 7px 12px;
}

.section-header {
  height: 50px;
  line-height: 50px;
  margin: 0 10px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  font-size: 16px;
}

.next-hours-body {
  display: flex;
  flex-direction: row;
  padding: 10px;
  overflow-y: scroll;
}
.next-hours-body .hour-data {
  text-align: center;
  flex: 0 0 80px;
}
.next-hours-body .hour-data img {
  width: 60px;
}

.next-hours-body .hour-data:not(:last-child) {
  border-right: 1px solid #eee;
}

/* next 5 days */
.next-week {
  margin: 7px 12px;
  background-color: white;
  color: black;
  overflow-y: scroll;
}

.next-week-body img {
  width: 60px;
}

.next-week-body .day {
  display: flex;
  flex-direction: row;
}

.next-week-body .day:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.next-week-body .day > :nth-child(2) {
  flex-grow: 1;
  text-align: center;
  padding-top: 10px;
}

.next-week-body .day .temp {
  line-height: 60px;
  margin-right: 10px;
}
</style>

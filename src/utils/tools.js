const DAY_STRS = ['Sun', 'Mon', 'Tues', 'Weds', 'Thur', 'Fri', 'Sat']
const MON_STRS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const formatDateDay = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  const date = new Date()
  date.setMonth(Number(month) - 1)
  date.setDate(Number(day))
  return `${DAY_STRS[date.getDay()]}, ${MON_STRS[date.getMonth()]} ${date.getDate()}`
}

export const formatDate = (date) =>
  `${MON_STRS[date.getMonth()]} ${date.getDate()} ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`

export const formatDateHour = (date) =>
  date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

export const toF = (deg) => Math.round(1.8 * (deg - 273) + 32)

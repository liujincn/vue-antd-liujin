import moment from 'moment'

export function simpleFormat (date) {
  if (date === undefined || date === null || date === '') {
    return date
  } else {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }
}

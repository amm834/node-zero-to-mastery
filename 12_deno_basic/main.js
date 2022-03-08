const response = await fetch('http://facebook.com')
const json = await response.json()

console.log(json)

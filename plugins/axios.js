export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  $axios.setHeader('Content-Type', 'application/json')
  const api = $axios.create()
  // Set baseURL to something different
  api.setBaseURL('https://postman.mgroverpartfinder.com')

  // Inject to context as $api
  inject('api', api)
}

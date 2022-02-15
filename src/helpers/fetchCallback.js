export default async (url, content, callback = null) => {
  const response = await fetch(url, content)
  const json = await response.json()
  response.json = json
  if (callback) {
    callback(response)
  }
  return response
}

const baseURL = 'https://us-central1-stake-for-good.cloudfunctions.net'

let cache = {}

function persistCache () {
  if (!window || !window.localStorage) return
  window.localStorage.setItem(btoa('_votingcache'), JSON.stringify(cache))
}

export function unloadCache () {
  if (!window || !window.localStorage) return
  try {
    cache = JSON.parse(window.localStorage.getItem(btoa('_votingcache'))) || {}
  } catch (error) {
    console.warn('Error unloading cache from local storage')
  }
}

function get (url) {
  if (!cache[url]) return null
  const hit = cache[url]
  if (new Date().getTime() - hit.date > hit.ttl * 1000) return null
  return hit.data
}

function set (url, data, ttl) {
  cache[url] = {
    data,
    date: new Date().getTime(),
    ttl
  }

  persistCache()
}

function unset (url) {
  delete cache[url]
  persistCache()
}

export async function getCurrentEpoch () {
  const url = `${baseURL}/getCurrentEpoch`
  const hit = get(url)
  if (hit) return hit
  const result = await fetch(url)
  const data = await result.json()
  set(url, data, 300)
  return data
}

export async function getCurrentVotingChoices () {
  const url = `${baseURL}/getCurrentVotingChoices`
  const hit = get(url)
  if (hit) return hit
  const result = await fetch(url)
  const data = await result.json()
  set(url, data, 300)
  return data
}

export async function castVote (epoch, choice) {
  const url = `${baseURL}/vote`
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ epoch, choice })
  })

  unset(`${baseURL}/getCurrentVotingChoices`)
}

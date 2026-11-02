/**
 * Local-only persistence. Everything lives in IndexedDB on this device —
 * there is no server, no sync, and no account that leaves the browser.
 */

const DB_NAME = 'ship-captain-crew'
const DB_VERSION = 1
const STORE = 'accounts'

/** One captain per device, so a fixed key keeps lookups trivial. */
const CAPTAIN_KEY = 'current'

let dbPromise = null

export function isSupported() {
  return typeof indexedDB !== 'undefined'
}

export function openDB() {
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  return dbPromise
}

function transact(mode, run) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE, mode)
        const store = transaction.objectStore(STORE)
        let result

        run(store, (value) => {
          result = value
        })

        transaction.oncomplete = () => resolve(result)
        transaction.onerror = () => reject(transaction.error)
        transaction.onabort = () => reject(transaction.error)
      }),
  )
}

/** The saved captain, or `null` if this device has none yet. */
export function loadCaptain() {
  return transact('readonly', (store, set) => {
    const request = store.get(CAPTAIN_KEY)
    request.onsuccess = () => set(request.result ?? null)
  })
}

/** Create the local captain record. Name is trimmed before storage. */
export function createCaptain(name) {
  const captain = {
    id: CAPTAIN_KEY,
    name: name.trim(),
    createdAt: Date.now(),
    gamesPlayed: 0,
  }

  return transact('readwrite', (store, set) => {
    store.put(captain)
    set(captain)
  })
}

/** Wipe the local captain. Used by the welcome screen to start over. */
export function deleteCaptain() {
  return transact('readwrite', (store, set) => {
    store.delete(CAPTAIN_KEY)
    set(null)
  })
}

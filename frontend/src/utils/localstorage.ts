import store from "store"

export const setStorage = (key: string, val: any) => {
  store.set(key, val)
}

// New function to get storage
export const getStorage = (key: string) => {
  return store.get(key)
}

// New function to delete storage
export const deleteStorage = (key: string) => {
  store.remove(key)
}


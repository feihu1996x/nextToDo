import config from '../config'

export class Store {
    static fetch () {
        return JSON.parse(localStorage.getItem(config.STORAGE_KEY) || '[]')
    }
    static save (items) {
        localStorage.setItem(config.STORAGE_KEY, JSON.stringify(items))
    }
}

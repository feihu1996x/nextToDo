import config from '../config'

class Store {
    static fetch () {
        let data = JSON.parse(localStorage.getItem(config.STORAGE_KEY) || '[]');
        if (!data || !data.length) {
            // TODO:从服务器拉取数据
        }
        return data
    }
    static save (items) {
        localStorage.setItem(config.STORAGE_KEY, JSON.stringify(items))
        // TODO: 将数据上传至服务器
    }
}

export default Store

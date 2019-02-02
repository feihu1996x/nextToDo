/*
 * @file: store.js
 * @brief: 数据存储
 * @author: feihu1996.cn
 * @date: 18-02-15
 * @version: 1.0
 */

const STORAGE_KEY = "nextToDo"

class Store {
	fetch()
	{
		// 从localStorage中获取items
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
	}
	save(items)
	{
		// 将items保存到localStorage中
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}
}

export default new Store

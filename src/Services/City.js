import axios from 'axios'
import { observable } from '../StateManage'
export default class City {
	@observable hotCitys = []
	@observable citys = []
	async fetchCityInfos() {
		const { data } = await axios.get('city.json')
		this.hotCitys = data.hotCitys
		this.citys = data.citys
	}
}

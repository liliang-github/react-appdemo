import axios from 'axios'
import { observable } from '../StateManage'
export default class Home {
	@observable currentCity = '上海'
	@observable banners = []
	@observable icons = []
	@observable recommends = []
	async fetchBanners() {
		const { data } = await axios.get('swiper.json')
		this.banners = data
	}
	async fetchIcons() {
		const { data } = await axios.get('icons.json')
		this.icons = data
	}
	async fetchRecommends() {
		const { data } = await axios.get('recommend.json')
		this.recommends = data
	}
}

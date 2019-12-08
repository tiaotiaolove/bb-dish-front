import { observable, action } from 'mobx'

export class DishListStore {
	@observable season: number|null = getCurrentSeason();

	@action changeSeason = async (season: number) => {
		this.season = season;
	};
}

/**
 * 获取季节
 */
const getCurrentSeason = () => {
	const currMonth = new Date().getMonth() + 1;
	if (currMonth === 3 || currMonth === 4 || currMonth === 5) {
		return 0;
	} else if (currMonth === 6 || currMonth === 7 || currMonth === 8) {
		return 1;
	} else if (currMonth === 9 || currMonth === 10 || currMonth === 11) {
		return 2;
	} else if (currMonth === 12 || currMonth === 1 || currMonth === 2) {
		return 3;
	}
	return null;
};

export default new DishListStore();
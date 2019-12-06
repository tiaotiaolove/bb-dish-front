import { observable, action } from 'mobx'
import {axiosFetch, handleResp} from "../../util/common/http";

export class DishListStore {
	@observable season: number = 0;
	@observable dataList: Array<any> = [];

	@action queryDishPage = async () => {
		const dishListRes = await axiosFetch('/dish/page', {
			method: 'POST',
			data: {
				season: this.season
			}
		});
		if (handleResp(dishListRes)) {
			this.dataList = dishListRes.context.list;
		}
	}
}

export default new DishListStore();
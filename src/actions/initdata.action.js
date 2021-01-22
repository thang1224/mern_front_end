import axiosIntance from "../helpers/axios";
import { categoryContants, initDataConstants, productConstants } from "./constants"

export const getInitData = () => {
    return async dispatch => {
        
        const res = await axiosIntance.post('/initialdata');
        if(res.status === 200){

            const { categories, products } = res.data;
            dispatch({
                type: categoryContants.GET_CATEGORY_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        }
        console.log(res);
    }
}
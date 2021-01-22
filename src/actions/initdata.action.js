import axiosIntance from "../helpers/axios";
import { initDataConstants } from "./constants"

export const getInitData = () => {
    return async dispatch => {
        
        const res = await axiosIntance.post('/initialdata');
        if(res.status === 200){

            const { categories, products } = res.data;
            dispatch({
                type: initDataConstants.GET_INITDATA_SUCCESS,
                payload: { categories }
            })
        }
    }
}
import axiosIntance from "../helpers/axios";
import { categoryContants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryContants.GET_CATEGORY_REQUEST });
        const res = await axiosIntance.get('category/get');
        console.log(res);
        //console.log('abvc');
        if(res.status === 200){
            const { categoryList } = res.data;
            dispatch({
                type: categoryContants.GET_CATEGORY_SUCCESS,
                payload: {categories: categoryList}
            });
            //console.log('abvc')
        }else{
            dispatch({
                type: categoryContants.GET_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            });
        }
        
    }
}

export const createCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryContants.ADD_CATEGORY_REQUEST });
        const res = await axiosIntance.post('category/create', form);
        if(res.status === 201){
            dispatch({
                type: categoryContants.ADD_CATEGORY_SUCCESS,
                payload: { category: res.data.category}
            });
        }else{
            dispatch({
                type: categoryContants.ADD_CATEGORY_FAILURE,
                payload: { error: res.data.error}
            })
        }
        console.log(res);    
    }
}
export const SET_LOADING = 'SET_LOADING';

export const setLoading = (loading) =>(        
    {
        type: SET_LOADING,
        payload: loading        
    }
);

// export function setLoading(loading) {
// 	return (dispatch) => {
// 		dispatch({
// 			type: SET_LOADING,
// 			loading: loading
// 		});
// 	};
// }
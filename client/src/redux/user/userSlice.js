import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state , action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

/*To see this thing we have to inspect and check that next to application there is a element called Redux
inside this Redux when we perform actions on sign-inj page then this signInStart,signInFailure etc perform
and state is also change from start to end  */

/*Now we import this userSlice() function  in store.js file i.e in store.js file inside the reducer:{}
we gonna import this  i.e reducer: {user: userReducer}*/

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
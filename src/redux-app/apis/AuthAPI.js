import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/*** API Imports  ***/
import { ProfileAPI } from './ProfileAPI';

export const AuthAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL || 'http://localhost:9010'}/api/v1/auth`
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body: body,
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(ProfileAPI.endpoints.getMyProfile.initiate(null));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),
    }),
});

export const { useLoginMutation } = AuthAPI;
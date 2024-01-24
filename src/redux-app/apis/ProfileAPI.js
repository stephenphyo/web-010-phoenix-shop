import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login } from 'redux-app/slices/AuthSlice';

export const ProfileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL || 'http://localhost:9010'}/api/v1/profile`
    }),
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => {
                return {
                    url: `/me`,
                    credentials: 'include',
                };
            },
            credentials: 'include',
            transformResponse: (result) => result.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(login(data));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),
    }),
})

export const { useGetMyProfileQuery } = ProfileAPI;
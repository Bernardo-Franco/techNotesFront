import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice"; // termCorrection => logOut should be called an "action creator" as it is exported from authSlice.actions

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials}
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // const { data } =
                    await queryFulfilled // this will return "data" that is the response of the server in this case it would return "cookie cleared"
                    // console.log(data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                                      
                    
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice
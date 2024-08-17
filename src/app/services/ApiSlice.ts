import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookieService from "../../services/cookies"
export const apiSlice=createApi({
    reducerPath: 'api',
    tagTypes: ['Products'],
    refetchOnReconnect:true,
    refetchOnMountOrArgChange:true,
    baseQuery:fetchBaseQuery({baseUrl:import.meta.env.VITE_SERVER_KEY}),
    endpoints:(build)=>({
        getDashboardProducts: build.query({
            query: (arg) => {
                const { page} = arg;
                return {
                    url: `/api/products?populate=thumbnail,category&pagination[pageSize]=7&pagination[page]=${page}`
                };
            },
            providesTags:result=> result?[...result.data.map(({id})=>({type:"Products",id})),{type:"Products",id:"LIST"}]
            :[{type:"Products",id:"LIST"}]
        }),
        deleteDashboardProduct:build.mutation({
            query(id){
                return{
                    url:`/api/products/${id}`,
                    method:'DELETE',
                    headers:{
                        Authorization:`Bearer ${cookieService.get("jwt")}`
                    }
                }

            },
            invalidatesTags:[{type:"Products",id:"LIST"}]
        }),
        updateDashboardProduct:build.mutation({
            query: ({id,body})=>({
                    url:`/api/products/${id}`,
                    method:'PUT',
                    headers:{
                        Authorization:`Bearer ${cookieService.get("jwt")}`
                    },
                    body,

            }),
            async onQueryStarted({id,...patch}, { dispatch, queryFulfilled }){
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getDashboardProducts', id, (draft) => {
                      Object.assign(draft, patch)
                    })
                  )
                  try {
                    await queryFulfilled
                  } catch {
                    patchResult.undo()
                  }
            },
            invalidatesTags:[{type:"Products",id:"LIST"}]
        })
    })
    })
    export const {
         useGetDashboardProductsQuery,
         useDeleteDashboardProductMutation,
         useUpdateDashboardProductMutation,
     } = apiSlice;
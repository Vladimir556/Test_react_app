import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IRocket} from "../models/IRocket";

export const rocketAPI = createApi({
  reducerPath: 'rocketAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spacexdata.com/v4'
  }),
  tagTypes: ['Rocket'],

  endpoints: (build) => ({
    fetchRockets: build.query<Record<string, IRocket>, void>({
      query: () => ({
        url: 'rockets',
      }),
      transformResponse: (baseQueryReturnValue: IRocket[]) => {
        const rockets: Record<string, IRocket> = {}

        baseQueryReturnValue.forEach((rocket) => {
          rockets[`${rocket.id}`] = rocket
        })

        return rockets
      }
    })
  }),
})

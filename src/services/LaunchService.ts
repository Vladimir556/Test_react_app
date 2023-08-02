import {ILaunchQuery, SortType} from "../models/ILaunch"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const launchAPI = createApi({
  reducerPath: 'launchAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spacexdata.com/v5/'
  }),
  // tagTypes: ['Launch'],

  endpoints: (build) => ({
    fetchLaunches: build.query<ILaunchQuery, { page: number, sort?: SortType }>({
      // по-умолчанию сортировка (сначала старые записи)
      query: ({page, sort = 'asc'}) => ({
        url: 'launches/query',
        method: 'POST',
        body: {
          query: {
            date_utc: {
              "$gte": "2015-01-01T00:00:00.000Z",
              "$lte": "2019-12-31T00:00:00.000Z"
            },
            success: true
          },
          options: {
            page,
            limit: 10,
            sort: {
              date_utc: sort
            }
          }
        }
      })
    })
  }),
})

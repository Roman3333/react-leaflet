import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IModel } from '../../types/model';

const API_URL = 'http://localhost:4000/';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Models'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getModels: builder.query<IModel[], null>({
      query: () => '/models',
      providesTags: ['Models'],
    }),
    createModels: builder.mutation<null, IModel>({
      query: (product) => ({
        body: product,
        url: '/models',
        method: 'POST',
      }),
      invalidatesTags: ['Models'],
    }),
    updateModel: builder.mutation<IModel, IModel>({
      query: (model) => ({
        url: `/models/${model.id}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: ['Models'],
    }),
    deleteModel: builder.mutation<IModel, IModel>({
      query: (model) => ({
        url: `/models/${model.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Models'],
    }),
  }),
});

export const {
  useGetModelsQuery,
  useCreateModelsMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} = apiSlice;

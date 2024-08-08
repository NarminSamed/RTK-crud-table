import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://northwind.vercel.app/api/" }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories",
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query({
      query: (id) => `categories/${id}`,
    }),
    editCategory: builder.mutation({
      query: ({ id, ...put }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: put,
      }),
      invalidatesTags: ['Category'],
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
        query: (id) => ({
          url: `categories/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Category'],
    })
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useEditCategoryMutation,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = apiSlice;

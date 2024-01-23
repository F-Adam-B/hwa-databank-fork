import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { formatTimestamp } from '../../utilities';

export type SampleType = {
  _id: number | null;
  createdAt: string;
  elementsTested: {
    description: string;
    elementName: string;
    value: string;
  }[];
  location: {
    coordinates: [number, number];
    county: string;
    type: string;
  };
  matrix: string;
  project: {
    _id: number | null;
    organization: string;
    projectName: string;
  };
  sampleDate: string;
  sampleNumber: string;
  sampleTime: string;
  stationName: string;
  stationNameTwo: string;
  updatedAt: string;
};

export type SamplesResponse = {
  samples: SampleType[];
};

// Define a service using a base URL and expected endpoints
export const samplesInventoryApi = createApi({
  reducerPath: 'sampleInventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  tagTypes: ['Samples'],
  endpoints: (builder) => ({
    getSamples: builder.query<SamplesResponse, void>({
      query: () => '/',
      providesTags: ['Samples'],
      transformResponse: (
        response: SamplesResponse,
        meta: undefined,
        arg: void
      ): SamplesResponse | Promise<SamplesResponse> => {
        const transformedSamples: SampleType[] = response.samples.map(
          ({ createdAt, ...rest }) => ({
            ...rest,
            createdAt: formatTimestamp(createdAt), // Adjust the transformation as necessary
          })
        );

        // Return an object that adheres to the InventoryItemsResponse interface
        return {
          samples: transformedSamples,
        };
      },
    }),
    // addNewItem: builder.mutation({
    //   // Specify the query for performing a POST request
    //   query: (newItem) => ({
    //     url: '/api/add-item',
    //     method: 'POST',
    //     body: newItem,
    //   }),
    //   invalidatesTags: ['Items'],
    // }),
    // deleteInventoryItem: builder.mutation<void, number>({
    //   // Specify the query for performing a POST request
    //   query: (id) => ({
    //     url: `/api/inventory-samples/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Items'],
    // }),
    // updateItem: builder.mutation<void, FormState & { id?: number }>({
    //   // Specify the query for performing a POST request
    //   query: (updatedItem) => {
    //     console.log(updatedItem, 'updateditem');
    //     return {
    //       url: `/api/inventory-samples/${updatedItem.id}`,
    //       method: 'PUT',
    //       body: updatedItem,
    //     };
    //   },
    //   invalidatesTags: ['Items'],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSamplesQuery } = samplesInventoryApi;

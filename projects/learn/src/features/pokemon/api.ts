/**
 * RTK Query
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PokemonData {
  species: {
    name: string;
  };
  sprites: {
    front_shiny: string;
  };
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  // baseUrl
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  // 端点
  endpoints: builder => ({
    // 自动生成hooks: `use${EndpointsKey}Query` 和`useLazy${EndpointsKey}Query`
    getPokemonByName: builder.query<PokemonData, string>({
      query: name => `pokemon/${name}`,
      transformResponse(baseQueryReturnValue: PokemonData, meta, arg) {
        console.log("baseQ ==>", baseQueryReturnValue, meta, arg);
        return baseQueryReturnValue;
      },
    }),
    // builder.query<返回值类型, 调用该hook是传入参数的类型>
    getById: builder.query<PokemonData, string>({
      query: id => `pokemon?id=${id}`,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetByIdQuery,
  useLazyGetByIdQuery,
} = pokemonApi;

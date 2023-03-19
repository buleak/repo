import React from 'react';
import { useGetPokemonByNameQuery } from '@/features/pokemon/api';
const pokemon = () => {
  const { data, error, isLoading, isFetching, refetch } = useGetPokemonByNameQuery("bulbasaur", {
    skip: false, // 为true时略过
  })
  // 使用查询钩子会自动获取数据并返回查询值
  if (error) return <div>Error-----</div>
  if (isLoading) return <div>Loading~~~~~</div>
  if (isFetching) return <div>Fetching~~~~~</div>
  return (
    <div>
      <div>
        <h3>{data?.species.name}</h3>
        <img src={data?.sprites.front_shiny} alt={data?.species.name} />
        <button onClick={refetch}>Refresh</button>
      </div>
    </div>
  )
};
export default pokemon;
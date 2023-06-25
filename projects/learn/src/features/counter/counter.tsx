import React from 'react';
import { useDispatch, useSelector } from '@/stores';
import { decrement, increment, incrementByAmount } from './slice';
import Pokemon from '@/features/pokemon';
// import type { RootState } from '@/app/stores';
// import { useDispatch, useSelector } from 'react-redux';

export default () => {
  // const count = useSelector((state: RootState) => state.counter.value)
  // const dispatch = useDispatch()
  // 不需要指定 state的类型了
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="w-80vw mx-auto text-center">
      <article border="double rd green" prose="sm red">
        <h1 className='hover:[text="dark:pink"]'>Hello</h1>
        <p text="yellow dark:pink">office viewer Markdown editor  preview mermaid support</p>
        <span className='prose-red'>{count}</span>
      </article>
      <div className='i-carbon-accessibility-color-filled hover:i-carbon-accessibility-color' />
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>IncrementByAmount</button>
      <div className="pokemon-box" flex="~ wrap row">
        {
          [1, 2, 3, 4].map(i => <Pokemon key={i} />)
        }
      </div>
    </div>
  )
}
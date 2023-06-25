// 全局错误UI
// error UI 必须是Client Component
"use client";

import { useEffect } from "react";

interface Props {
  error: Error;
  reset: () => void;
}
// 因为 error.tsx组件是包裹在Layout.tsx组件中的，所以它捕获不了 Layout中的错误
// 根error.tsx不能捕获根Layout的错误， 所以要用global-error.tsx文件捕获， 但是必须在global-error.tsx 中定义 html & body
export default ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body>
        <div>
          <h1>Global Error</h1>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
};

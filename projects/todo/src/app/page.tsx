import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

// 路由导航的两种方式： <Link href> & useouter
export default function Home() {
  // useRouter只能在client compoent中使用
  // const router = useRouter();
  const toPath =() => {
    // router.push("/path1")
    console.log("useRouter只能在 Client Component 使用")
  }
  return (
    <main className={styles.main}>
      <Link href="/user" className='font-blod underline bg-red-400 to-blue-400 text-4xl'>User</Link>
      {/* Server Component一般是静态组件， 不能够注入事件 */}
      {/* <button onClick={toPath}>to Path</button> */}
    </main>
  )
}

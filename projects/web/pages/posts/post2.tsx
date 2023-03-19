
import {getSortedPostsData} from '../../utils/getMd'
export default (props: {postsData: any[]}) => {
  console.log('props.postsData', props.postsData)
  return <div>
    <h1>Post2</h1>
    {
      props.postsData.map(post => (
        <section key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.id}</p>
          <div>{post.date}</div>
        </section>

      ))
    }
  </div>
}

export async function getServerSideProps() {
 const postsData = getSortedPostsData();
  return {
    props: {
      postsData
    }
  }
}
import Head from 'next/head';
import marked from 'marked';
import getPosts from '../lib/getPosts';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Godin style blog demo</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Godin style blog demo</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.fields.title}</h3>
              <time>{post.fields.published}</time>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(post.fields.content),
                }}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
      revalidate: 1,
    },
  };
}

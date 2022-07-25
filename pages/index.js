import Login from '../src/components/Forms/Login/Login'

/* import clientPromise from '../lib/mongodb' */

import Layout from '../src/components/layout'
export default function Home() {
  return (
    <Layout>
      {/*       {isConnected ? (
        <h1 className='subtitle text-light'>Welcome</h1>
      ) : (
        <h1 className='subtitle text-light'>Welcome!</h1>
      )} */}
      <Login />
    </Layout>
  )
}

/* export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
} */

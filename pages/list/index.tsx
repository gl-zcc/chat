import http from "../components/http"
import { connectToDatabase } from "../../unit/mongodb"

const Index = (props: any) => {
  console.log(props);
  return (<>
    <h3>List</h3>
    {props.list}
  </>)
}

export async function getServerSideProps (context:any) {

  const { db } = await connectToDatabase();

  const user = await db
    .collection("user")
    .find({})
    .toArray();
  console.log(user);

  const {req} = context;

  const result = await http.get('http://' + req.headers.host + '/api/list');

  return {
    props:  result.data
  }
}

export default Index
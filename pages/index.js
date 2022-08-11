import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const Home = (props) => {
   return (
      <Fragment>
         <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse a huge list of highly active React meetups!" />
         </Head>
         <MeetupList meetups={props.meetups} />
      </Fragment>
   );
};

export async function getStaticProps() {
   // Fetch data from an API

   const client = await MongoClient.connect(
      "mongodb+srv://CooleX:!66kfg7LBULSEVZ@cluster0.qvhaaoq.mongodb.net/?retryWrites=true&w=majority"
   );

   const db = client.db();

   const meetupCollection = db.collection("meetups");

   const meetups = await meetupCollection.find().toArray();

   client.close();

   return {
      props: {
         meetups: meetups.map((meetup) => ({
            title: meetup.data.title,
            address: meetup.data.address,
            image: meetup.data.image,
            id: meetup._id.toString(),
         })),
      },
      revalidate: 10,
   };
}

/* export async function getServerSideProps(context) {
   const req = context.req;
   const res = context.res;

     // Fetch data from an API
   return {
      props: {
         meetups: DUMMY_MEETUPS
      }
   }
} */

export default Home;

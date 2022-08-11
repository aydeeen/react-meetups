import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
   return (
      <Fragment>
         <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description} />
         </Head>
         <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
         />
      </Fragment>
   );
};

export async function getStaticPaths() {
   const client = await MongoClient.connect(
      "mongodb+srv://CooleX:!66kfg7LBULSEVZ@cluster0.qvhaaoq.mongodb.net/?retryWrites=true&w=majority"
   );

   const db = client.db();

   const meetupsCollection = db.collection("meetups");

   const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

   client.close();

   return {
      fallback: false,
      paths: meetups.map((meetup) => ({
         params: {
            meetupId: meetup._id.toString(),
         },
      })),
   };
}

export async function getStaticProps(context) {
   // Fetch data for a single meetup

   const meetupId = context.params.meetupId;

   const client = await MongoClient.connect(
      "mongodb+srv://CooleX:!66kfg7LBULSEVZ@cluster0.qvhaaoq.mongodb.net/?retryWrites=true&w=majority"
   );

   const db = client.db();

   const meetupsCollection = db.collection("meetups");

   const selectedMeeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
   });

   client.close();

   return {
      props: {
         meetupData: {
            id: selectedMeeetup._id.toString(),
            title: selectedMeeetup.data.title,
            address: selectedMeeetup.data.address,
            description: selectedMeeetup.data.description,
            image: selectedMeeetup.data.image,
         },
      },
   };
}

export default MeetupDetails;

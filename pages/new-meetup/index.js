import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
   const router = useRouter();

   const addMeetupHandler = async (enteredMeetupData) => {
      const response = await fetch("/api/new-meetup", {
         method: "POST",
         body: JSON.stringify(enteredMeetupData),
         headers: {
            "Content-Type": "application/json",
         },
      });

      const data = response.json();

      console.log(data);

      router.push("/");
   };

   return (
      <Fragment>
         <Head>
            <title>Add a new Meetup</title>
            <meta
               name="description"
               content="Add your own meetups abd create amazing opportunities."
            />
         </Head>
         <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </Fragment>
   );
};

export default NewMeetupPage;

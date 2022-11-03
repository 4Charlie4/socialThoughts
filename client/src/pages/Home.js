import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

const Home = () => {
  //query hook makes request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //optional chaining can only be used in the browser. Very new
  const thoughts = data?.thoughts || [];

  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">{/* PRINT THOUGHT LIST */}</div>
        {loading ? (
          <div> Loading... </div>
        ) : (
          <ThoughtList
            thoughts={thoughts}
            title="Some Feed for Thought(s)..."
          />
        )}
      </div>
    </main>
  );
};

export default Home;

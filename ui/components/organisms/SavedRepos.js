import React, { useEffect, useState } from "react";
import SearchRepoInput from "../atoms/SearchRepoInput";
import RepositoriesList from "../molecules/RepositoriesList";
import { useUser } from "@auth0/nextjs-auth0";
import client from "../../apollo-client";
import { gql } from "@apollo/client";

export default function SavedRepos(props) {
  const [search, setSearch] = useState("");
  const [allRepos, setAllRepos] = useState([]);
  const { user, error, isLoading } = useUser();

  useEffect(async () => {
    const { data } = await client.query({
      query: gql`
        query UserRepositories($userSub: String!) {
          Repository(userSub: $userSub) {
            repoId
            name
            url
            owner
            owner_avatar
          }
        }
      `,
      variables: {
        userSub: user ? user.sub : "",
      },
    });

    setAllRepos(data.Repository);
  }, [user]);

  useEffect(() => {
    if (!search) {
      props.setRepos(allRepos);
      return false;
    }
    const filteredRepos = allRepos.filter((repo) => {
      return repo.name.includes(search) || repo.url.includes(search);
    });

    props.setRepos(filteredRepos);
  }, [search, allRepos]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="mt-5">
      <SearchRepoInput search={search} onChange={setSearch} />
      <RepositoriesList repos={props.repos} />
    </div>
  );
}

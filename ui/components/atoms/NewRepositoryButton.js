import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import ApolloClient from "../../apollo-client";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

const ADD_REPOSITORY = gql`
  mutation CreatingRepository(
    $githubId: Int!
    $userSub: String!
    $name: String!
    $url: String!
    $owner: String!
    $owner_avatar: String!
  ) {
    CreateRepository(
      githubId: $githubId
      userSub: $userSub
      name: $name
      url: $url
      owner: $owner
      owner_avatar: $owner_avatar
    ) {
      repoId
      name
      owner
    }
  }
`;

export default function NewRepositoryButton(props) {
  const [addRepository] = useMutation(ADD_REPOSITORY, {
    client: ApolloClient,
  });
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const submit = () => {
    let isValid = true;
    if (!validURL(props.repo)) {
      isValid = false;
      props.onValidationChange(false);
      props.setValidationMessage("URL Inválida");
    }

    if (props.repos.find((repo) => repo.url === props.repo)) {
      isValid = false;
      props.onValidationChange(false);
      props.setValidationMessage("Repositório já adicionado.");
    }

    if (!isValid) {
      return false;
    }

    const onError = () => {
      isValid = false;
      props.onValidationChange(false);
      props.setValidationMessage("Link do github não encontrado.");
    };
    getDataFromGithub(sendGithubResponseToDatabase, onError);
  };

  function getDataFromGithub(onfulfilled, onError) {
    const beforeAPI = props.repo.substr(0, props.repo.indexOf("github"));
    const afterAPI = props.repo.substr(props.repo.indexOf("github.com"), 10);
    const afterRepos = props.repo.substr(props.repo.indexOf(".com") + 4);
    const githubAPIUrl = `${beforeAPI}api.${afterAPI}/repos${afterRepos}`;
    axios.get(githubAPIUrl).then(onfulfilled, onError);
  }

  function sendGithubResponseToDatabase(response) {
    addRepository({
      variables: {
        githubId: response.data.id,
        userSub: user.sub,
        name: response.data.name,
        url: response.data.html_url,
        owner: response.data.owner.login,
        owner_avatar: response.data.owner.avatar_url,
      },
    }).then(() => {
      window.location.reload();
    });
  }

  function validURL(str) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str) && str.includes("github");
  }

  return (
    <button className="button is-primary" onClick={submit}>
      Enviar
    </button>
  );
}

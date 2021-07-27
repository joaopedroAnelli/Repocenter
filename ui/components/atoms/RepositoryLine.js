import React from "react";
import { gql, useMutation } from "@apollo/client";
import ApolloClient from "../../apollo-client";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const REMOVE_REPO = gql`
  mutation DeleteRepository($repoId: ID!) {
    DeleteRepository(repoId: $repoId) {
      name
    }
  }
`;

export default function RepositoryLine(props) {
  const [deleteRepoFromAPI] = useMutation(REMOVE_REPO, {
    client: ApolloClient,
  });
  const repo = props.repo || {};

  const deleteRepo = () => {
    document.getElementById(`modal-${repo.name}`).classList.add("is-active");
  };

  const submitDestroy = () => {
    deleteRepoFromAPI({
      variables: { repoId: props.repo.repoId },
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="column is-4">
      <DeleteConfirmationModal repoName={repo.name} onConfirm={submitDestroy} />
      <article className="media box repo-card">
        <figure className="media-left">
          <p className="image is-64x64">
            <img className="is-rounded" src={repo.owner_avatar} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{repo.name}</strong>{" "}
              <small className="has-text-grey-light">
                &nbsp; by {repo.owner}
              </small>{" "}
              <br />
              <a target="_blank" href={repo.url} rel="noreferrer">
                {repo.url}
              </a>
            </p>
          </div>
        </div>
        <div className="media-right">
          <button className="delete" onClick={deleteRepo}>
            Deletar repositorio
          </button>
        </div>
      </article>
    </div>
  );
}

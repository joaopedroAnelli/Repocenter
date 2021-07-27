import React from "react";
import RepositoryLine from "../atoms/RepositoryLine";

export default function RepositoriesList(props) {
  if (!props.repos.length) {
    return (
      <section className="section is-flex is-justify-content-center is is-align-content-center">
        <div className="message has-text-grey-light">
          Nenhum repositório encontrado...
        </div>
      </section>
    );
  }
  return (
    <div className="columns p-4 is-multiline">
      {props.repos.map((repo) => {
        return <RepositoryLine key={repo.repoId} repo={repo} />;
      })}
    </div>
  );
}

import NewRepositoryBar from "../components/molecules/NewRepositoryBar";
import React, { useState } from "react";
import SavedRepos from "../components/organisms/SavedRepos";
import Navbar from "../components/molecules/Navbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function repositorios() {
  const [repos, setRepos] = useState([]);
  const [urlIsValid, setUrlIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  return (
    <main className="has-background-white-ter">
      <Navbar />
      <section className="section">
        <h1 className="title is-1">Repositorios</h1>
        <SavedRepos repos={repos} setRepos={setRepos} />
        <NewRepositoryBar
          repos={repos}
          isValid={urlIsValid}
          onValidationChange={setUrlIsValid}
          validationMessage={validationMessage}
          setValidationMessage={setValidationMessage}
        />
      </section>
    </main>
  );
});

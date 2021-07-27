import NewRepositoryInput from "../atoms/NewRepositoryInput";
import NewRepositoryButton from "../atoms/NewRepositoryButton";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function NewRepositoryBar(props) {
  const [newRepo, setNewRepo] = useState("");

  return (
    <div>
      <div className="field has-addons">
        <div className="control has-icons-left is-expanded">
          <NewRepositoryInput repo={newRepo} onChange={setNewRepo} />
          <span className="icon is-left is-small">
            <FontAwesomeIcon icon={faLink} />
          </span>
        </div>
        <div className="control">
          <NewRepositoryButton
            isValid={props.isValid}
            onValidationChange={props.onValidationChange}
            repo={newRepo}
            repos={props.repos}
            validationMessage={props.validationMessage}
            setValidationMessage={props.setValidationMessage}
          />
        </div>
      </div>
      {!props.isValid && (
        <p className="help is-danger is-small"> {props.validationMessage}</p>
      )}
    </div>
  );
}

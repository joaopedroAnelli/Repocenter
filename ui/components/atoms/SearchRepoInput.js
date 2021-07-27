import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchRepoInput(props) {
  return (
    <div className="field">
      <p className="control has-icons-left">
        <input
          className="input is-expanded is-rounded"
          placeholder={"Pesquise por nome ou url do repo"}
          value={props.search}
          onChange={(event) => {
            props.onChange(event.target.value);
          }}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faSearch} className="is-small" />
        </span>
      </p>
    </div>
  );
}

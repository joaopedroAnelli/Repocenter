import React from "react";

export default function NewRepositoryInput({ repo, onChange }) {
  return (
    <input
      className="input is-fullwidth"
      onChange={(event) => onChange(event.target.value)}
      value={repo}
      type={"text"}
      placeholder={"URL do novo repositório"}
    />
  );
}

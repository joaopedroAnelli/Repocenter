import React from "react";

export default function DeleteConfirmationModal(props) {
  const close = () => {
    document
      .getElementById(`modal-${props.repoName}`)
      .classList.remove("is-active");
  };
  return (
    <div id={`modal-${props.repoName}`} className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Você tem certeza?</p>
        </header>
        <section className="modal-card-body">
          {`Deseja mesmo excluir o repositório ${props.repoName}?`}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={props.onConfirm}>
            Sim
          </button>
          <button className="button" onClick={close}>
            Não
          </button>
        </footer>
      </div>
    </div>
  );
}

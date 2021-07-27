import React from "react";
import LoginButton from "../atoms/LoginButton";
import { useUser } from "@auth0/nextjs-auth0";
import LogoutButton from "../atoms/LogoutButton";

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://i.ibb.co/jDyCyCC/database.png"
            width="28"
            height="28"
          />
          <strong>Repocenter</strong>
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            {!!user && (
              <figure className="image mr-3">
                <img
                  className="is-rounded"
                  width="28"
                  height="28"
                  src={user.picture}
                />
              </figure>
            )}
            {!!user && <span>{user.name}</span>}
          </div>
          <div className="navbar-item">
            <div className="buttons">
              {!!user && <LogoutButton />}
              {!user && <LoginButton />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

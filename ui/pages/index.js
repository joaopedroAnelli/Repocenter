import React from "react";
import Head from "next/head";
import LoginButton from "../components/atoms/LoginButton";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Navbar from "../components/molecules/Navbar";

export default function Home() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    router.push("/repositorios");
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>Repocenter</title>
        <meta name="description" content="A sua central de repositórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <section className="hero is-link is-fullheight-with-navbar mesh-gradient">
          <div className="hero-body">
            <p className="title has-text-weight-light has-text-black-bis">
              Todos os seus repositórios,{" "}
              <strong className="has-text-weight-bold">em um só lugar.</strong>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

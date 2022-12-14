import Head from "next/head";
import { Toaster } from "react-hot-toast";

// Components
import Header from "../components/Header";
import Notes from "../components/Notes";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-auto px-28 py-16 relative bg-bg-home">
        <Header />
        <Notes />
        <Toaster />
      </main>
    </div>
  );
}

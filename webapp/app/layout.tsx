
import ClientHead from "@/app/ui/client/clientHead"
import "@/app/globals.css";

import  NavBar from "./ui/client/header";
import { Provider } from 'jotai'
import { siteMetadata } from "./site_data/_metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();
  return (
    <html lang="ja" >
      <Provider>
      <ClientHead/>
      <body>
        <NavBar />
        <main className="max-w-4xl mx-auto " >
        {children}
        </main>
        <footer className="font-light text-sm flex justify-center">
          <p className="">
          ©{year} {siteMetadata.name.en}. All Right Reserved.
            </p></footer>
      </body>
      </Provider>
    </html>
  );
}
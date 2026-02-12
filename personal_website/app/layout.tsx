
import ClientHead from "@/app/ui/client/clientHead"
import "katex/dist/katex.min.css";
import "@/app/globals.css";
import  NavBar from "./ui/client/header";
import { Provider } from 'jotai'
import { siteMetadata } from "@/personal/_metadata";
// import { Noto_Sans_JP, Hind} from 'next/font/google'
// const note_sans_jp = Noto_Sans_JP({
//   weight: ['100', '300', '400', '500', '700', '900'],
//   subsets: ['latin'],
//   display: 'swap',
// })

// const hind = Hind({
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// })
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
        <footer className="mt-5 font-light text-sm flex justify-center">
          <p className="">
          ©{year} {siteMetadata.name.en}. All Right Reserved.
            </p></footer>
      </body>
      </Provider>
    </html>
  );
}
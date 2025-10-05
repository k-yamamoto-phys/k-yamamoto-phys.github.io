
import ClientHead from "@/app/client_ui/clientHead"
import { Inter, Noto_Sans_JP } from "next/font/google";
import "@/app/globals.css";
import { BottomNav, NavBar } from "@/app/ui/header";
import { Provider } from 'jotai'
const inter = Inter({ subsets: ["latin"] , display: 'swap', });
const note_sans_jp = Noto_Sans_JP({ subsets: ["latin"]})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${note_sans_jp.className}`}>
      <Provider>
      <ClientHead/>
      <body>
        <NavBar />
        <main className="max-w-4xl mx-auto" >
        {children}
        </main>
      </body>
      </Provider>
    </html>
  );
}
export default function JaLayout({children} : {children: React.ReactNode}) {
    return (
        <main lang="ja" className="max-w-4xl mx-auto flex-1 w-full">
            {children}
        </main>
    );
}
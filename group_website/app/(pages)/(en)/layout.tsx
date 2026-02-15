export default function EnLayout({children} : {children: React.ReactNode}) {
    return (
        <main className="max-w-4xl mx-auto flex-1 w-full">
            {children}
        </main>
    );
}
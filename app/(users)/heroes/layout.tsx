import HeroesList from './HeroesList';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1">
            <div>
               {children}
            </div>
            <div className="flex-1"> {/* @ts-ignore */}
                <HeroesList /></div>
        </main>
    );
}
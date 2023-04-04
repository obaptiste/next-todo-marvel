import HeroesList from './HeroesList';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex">
            <div>
                {/* @ts-ignore */}
                <HeroesList />
            </div>
            <div className="flex-1">{children}</div>
        </main>
    );
}
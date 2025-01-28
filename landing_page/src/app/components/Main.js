export default function Main() {
    return (
        <main className={mainStyle}>
            {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={boxStyle}>
                    Box {i + 1}
                </div>
            ))}
        </main>
    );
}

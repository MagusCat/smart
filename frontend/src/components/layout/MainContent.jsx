function MainContent({children}){
    return (
        <main className="flex flex-col h-full w-full z-10">
            {children}
        </main>
    );
}

export default MainContent;
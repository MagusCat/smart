function Layout({children}){
    return (
        <div className="flex flex-grow flex-col w-full h-full max-w-320 px-10 lg:px-20 mx-auto">
            {children}
        </div>
    );
}

export default Layout;
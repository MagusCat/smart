function Layout({children}){
    return (
        <div className="flex flex-col w-full h-full max-w-320 px-10 lg:px-20 mx-auto py-8">
            {children}
        </div>
    );
}

export default Layout;
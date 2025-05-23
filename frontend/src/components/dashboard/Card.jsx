function Card({ children, tittle = "", subTittle = "" }) {
  return (
    <article className="bg-(--bg-fourth) shadow-xl rounded-2xl p-4 flex flex-col border-3 h-40 w-full max-w-80 ms:w-1/4 items-center text-center transition-color duration-200 hover:border-(--font-accent) hover:-translate-y-2 hover:shadow-2xl">
      <header className="h-5">
        <h2 className="text-lg font-bold text-(--font-white)">{tittle}</h2>
      </header>
      <div className="flex-1 flex items-center justify-center w-full">
        {children}
      </div>
      <p className="mt-auto w-full pt-3 text-gray-500 text-xs border-t">
        {subTittle}
      </p>
    </article>
  );
}

export default Card;

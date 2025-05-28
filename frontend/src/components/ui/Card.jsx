import React from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";

export function CardHeader({ children, className }) {
  return (
    <header className={`text-lg font-bold text-center ${className}`}>
      <h2>{children}</h2>
    </header>
  );
}

export function CardFooter({ children, className }) {
  return (
    <footer
      className={`mt-auto w-full pt-3 text-gray-500 text-xs border-t ${className}`}
    >
      {children}
    </footer>
  );
}

export function CardContent({ children, className }) {
  return (
    <div
      className={`flex-1 flex items-center justify-center w-full ${className}`}
    >
      {children}
    </div>
  );
}

export function Card({ children, className }) {
  return <article className={className}>{children}</article>;
}

export function CardInfo({ title, items }) {
  return (
    <Card className="rounded-2xl p-4 flex flex-col w-full md:w-2/3 md:max-w-70 h-45 bg-[var(--bg-fourth)] border-2 border-gray-300 text-[var(--font-white)] shadow-xl transition-all duration-300 ease-out hover:border-[var(--font-accent)] hover:-translate-y-1">
      <CardHeader className="font-bold">{title}</CardHeader>
      <CardContent className="font-bold">
        <div className="flex justify-center text-center flex-row w-full gap-3">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="w-[0.5px] mx-5 my-1.5 bg-white" />}
              <section>
                <h2 className="text-xl text-[var(--font-accent)]">
                  {item.value}
                </h2>
                <p className="font-normal text-xs text-gray-300">
                  {item.label}
                </p>
              </section>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
      <CardFooter className="h-5" />
    </Card>
  );
}

export function CardChart({ title, children, className }) {
  return (
    <Card className={`flex flex-col ${className}`}>
      {title && <CardHeader>{title}</CardHeader>}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function CardDetails({children, className}){
  return (
    <Card className={`bg-white shadow-2xl p-3 rounded-2xl border-2 border-gray-400 text-black ${className}`}>
      {children}
    </Card>
  )
}

export function CardMain({children, className}){
  return (
    <Card className={`flex flex-row bg-(--bg-secundary) mt-10 p-5 rounded-xl shadow-xl border-gray-400 border-2 gap-5 ${className}`}>
      {children}
    </Card>
  )
}
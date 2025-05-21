function Avatar({ src, name }) {
  return (
      <div className="flex w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden">
        <img
          src={src}
          alt={name || "Avatar"}
          className="aspect-square"
        />
      </div>
  );
}

export default Avatar;

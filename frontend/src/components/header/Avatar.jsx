function Avatar({ src, name }) {
  return (
      <div className="block min-w-[3em] min-h-[3em] size-[3em] rounded-full overflow-hidden">
        <img
          src={src}
          alt={name || "Avatar"}
          className="w-full h-full aspect-square"
        />
      </div>
  );
}

export default Avatar;

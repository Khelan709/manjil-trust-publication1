/** Material Symbols icon. `size` is in px; colour/size overrides go through className. */
export default function Icon({ name, size, filled = false, className = '', ...rest }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined${filled ? ' filled' : ''} ${className}`.trim()}
      style={size ? { fontSize: size } : undefined}
      {...rest}
    >
      {name}
    </span>
  );
}

import SmartLink from './SmartLink';
import Icon from './Icon';

const VARIANTS = {
  primary: 'bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed-dim',
  navy: 'bg-primary text-on-primary hover:bg-primary-container',
  container: 'bg-primary-container text-on-primary hover:bg-primary',
  gold: 'bg-secondary text-on-secondary hover:opacity-90',
  goldHover: 'bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container',
  amber: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim',
  soft: 'bg-surface-container text-primary hover:bg-surface-container-high',
  softHighest: 'bg-surface-container-highest text-primary hover:bg-surface-dim',
  light: 'bg-surface-container-lowest text-primary hover:bg-surface-container',
  ghost: 'border border-primary/30 text-primary hover:bg-surface-container',
};

const SIZES = {
  lg: 'px-6 py-3.5 font-label-lg text-label-lg',
  md: 'px-5 py-2.5 font-label-md text-label-md',
  sm: 'px-space-md py-space-sm font-label-md text-label-md',
  xs: 'px-3 py-1.5 font-label-sm text-label-sm',
};

/**
 * Polymorphic button: renders a router <Link> when `to` is set, an <a> when
 * `href` is set (external), otherwise a <button>.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  trailingIcon,
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const cls = `inline-flex items-center justify-center gap-space-xs rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const iconSize = size === 'lg' ? 18 : 16;
  const content = (
    <>
      {icon && <Icon name={icon} size={iconSize} />}
      <span>{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
    </>
  );
  if (to) return <SmartLink to={to} className={cls} {...rest}>{content}</SmartLink>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button type="button" className={cls} {...rest}>{content}</button>;
}

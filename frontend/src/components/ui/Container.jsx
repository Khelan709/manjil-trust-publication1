/** Centred 1280px content canvas with the design's responsive page margins. */
export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`max-w-7xl mx-auto px-6 lg:px-12 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

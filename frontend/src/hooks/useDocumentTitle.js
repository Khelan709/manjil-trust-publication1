import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Manjil Publication` : 'Manjil Publication | Publishing House & Research Archive';
  }, [title]);
}

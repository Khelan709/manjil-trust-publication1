import { useState, useCallback } from 'react';

/**
 * Tracks the lifecycle of an async form submission.
 * status: 'idle' | 'loading' | 'success' | 'error'
 */
export default function useSubmit(submitFn) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const submit = useCallback(
    async (...args) => {
      setStatus('loading');
      setMessage('');
      try {
        const result = await submitFn(...args);
        setStatus('success');
        setMessage(result?.message || 'Thank you — your submission was received.');
        return true;
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Something went wrong. Please try again.');
        return false;
      }
    },
    [submitFn]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setMessage('');
  }, []);

  return { status, message, submit, reset, loading: status === 'loading' };
}

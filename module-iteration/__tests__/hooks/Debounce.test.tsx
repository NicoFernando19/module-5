import { renderHook, act } from '@testing-library/react';
import useDebounce from '@/hooks/Debounce';

describe('useDebounce Hook', () => {
  jest.useFakeTimers();

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value'));
    expect(result.current).toBe('initial value');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' },
      }
    );

    rerender({ value: 'changed' });
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed');
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500));
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});

import { renderHook } from '@testing-library/react';
import { useColorGrade } from '@/hooks/use-color-grade';

describe('useColorGrade hook', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useColorGrade());

    expect(result.current.referenceImage).toBeNull();
    expect(result.current.targetImage).toBeNull();
    expect(result.current.outputImage).toBeNull();
    expect(result.current.settings.lut).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});

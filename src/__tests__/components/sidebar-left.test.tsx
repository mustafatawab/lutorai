import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarLeft } from '@/components/layout/sidebar-left';
import { useColorGrade } from '@/hooks/use-color-grade';

// Mock the useColorGrade hook
jest.mock('@/hooks/use-color-grade', () => ({
  useColorGrade: jest.fn(),
}));

describe('SidebarLeft component', () => {
  beforeEach(() => {
    (useColorGrade as jest.Mock).mockReturnValue({
      referenceImage: null,
      setReferenceImage: jest.fn(),
    });
  });

  it('should allow uploading a reference image', () => {
    const setReferenceImageMock = jest.fn();
    (useColorGrade as jest.Mock).mockReturnValue({
      referenceImage: null,
      setReferenceImage: setReferenceImageMock,
    });

    render(<SidebarLeft />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Upload Reference Image/i);

    fireEvent.change(input, { target: { files: [file] } });

    expect(setReferenceImageMock).toHaveBeenCalledWith(file);
  });
});

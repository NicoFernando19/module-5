import { render, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  it('renders button with correct label', () => {
    const { getByText } = render(
      <Button onClick={mockOnClick} label='Test Button' />
    );
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const { getByText } = render(
      <Button onClick={mockOnClick} label='Test Button' />
    );
    fireEvent.click(getByText('Test Button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Button
        onClick={mockOnClick}
        label='Test Button'
        className='custom-class'
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

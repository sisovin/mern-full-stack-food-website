import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
  test('renders Modal component when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = screen.getByText(/Modal Content/i);
    expect(modalContent).toBeInTheDocument();
  });

  test('does not render Modal component when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = screen.queryByText(/Modal Content/i);
    expect(modalContent).toBeNull();
  });

  test('calls onClose event handler when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

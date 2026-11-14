
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface AdmissionModalContextValue {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const AdmissionModalContext =
  createContext<AdmissionModalContextValue | null>(null);

export function AdmissionModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically open Admission Popup when website loads
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <AdmissionModalContext.Provider
      value={{ openModal, closeModal, isOpen }}
    >
      {children}
    </AdmissionModalContext.Provider>
  );
}

export function useAdmissionModal() {
  const ctx = useContext(AdmissionModalContext);

  if (!ctx) {
    throw new Error(
      'useAdmissionModal must be used within AdmissionModalProvider'
    );
  }

  return ctx;
}

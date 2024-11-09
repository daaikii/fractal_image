import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react"

export type ModalContextType = {
  modalDisplay: boolean
  setModalDisplay: Dispatch<SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalDisplay, setModalDisplay] = useState<boolean>(false)
  return (
    <ModalContext.Provider value={{ modalDisplay, setModalDisplay }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
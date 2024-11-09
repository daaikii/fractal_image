import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState, useContext } from "react";

export type NavContextType = {
  navDisplay: boolean
  setNavDisplay: Dispatch<SetStateAction<boolean>>
}

const NavContext = createContext<NavContextType | null>(null)

export function NavProvider({ children }: PropsWithChildren) {
  const [navDisplay, setNavDisplay] = useState<boolean>(false)
  return (
    <NavContext.Provider value={{ navDisplay, setNavDisplay }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}
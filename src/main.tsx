import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import './index.css'
import { CanvasProvider } from './store/CanvasProvider.tsx'
import { ModalProvider } from './store/ModalProvider.tsx'
import { NavProvider } from './store/NavigationProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CanvasProvider>
      <ModalProvider>
        <NavProvider>
          <App />
        </NavProvider>
      </ModalProvider>
    </CanvasProvider>
  </StrictMode>,
)

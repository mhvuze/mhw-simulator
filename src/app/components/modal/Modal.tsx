import React, { useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../common/Button'

require('./Modal.css')

interface Props {
  title?: string
  className?: string
  onClose: () => void
}

const rootEl = document.getElementById('root')!

const ESC = 27

const Modal: React.FC<Props> = ({ title, className, onClose, children }) => {
  const onClick = useCallback((e: React.MouseEvent) => e.currentTarget === e.target && onClose(), [])

  useLayoutEffect(() => {
    const type = 'keydown'
    const listener = (e: KeyboardEvent) => e.keyCode === ESC && onClose()
    const disposer = () => document.removeEventListener(type, listener)

    document.addEventListener(type, listener)

    return disposer
  }, [])

  return createPortal(
    <div className="Modal" onClick={onClick}>
      <div className={`Modal-contener ${className || ''}`}>
        {!!title &&
          <div className="Modal-title">{title}</div>
        }
        <div className="Modal-contents">
          {children}
        </div>
        <div className="Modal-actions">
          <Button label="Close" onClick={onClose} />
        </div>
      </div>
    </div>,
    rootEl
  )
}
export default Modal

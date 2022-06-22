import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Toolbar({ children }: Props) {
  return (
    <div style={{
      display: 'flex',
      margin: 16
    }}>
      {children}
    </div>
  )
}
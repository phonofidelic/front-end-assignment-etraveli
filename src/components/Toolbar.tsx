import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Toolbar({ children }: Props) {
  return (
    <div style={{
      display: 'flex',
      padding: 16,
      backgroundColor: '#F5F5F5'
    }}>
      {children}
    </div>
  )
}
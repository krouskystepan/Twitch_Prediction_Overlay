const OverlayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-dvh">
      <div className="relative inset-4 h-40 w-md overflow-hidden">
        {children}
      </div>
    </main>
  )
}

export default OverlayLayout

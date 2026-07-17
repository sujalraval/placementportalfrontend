interface NavOverlayProps {
  show: boolean
  onClose: () => void
}

export function NavOverlay({ show, onClose }: NavOverlayProps) {
  if (!show) return null
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[55] bg-[rgba(10,15,28,.45)] lg:hidden"
    />
  )
}

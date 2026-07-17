import { Icon } from '@/components/icons/Icon'

interface StepperProps {
  stages: string[]
  currentIndex: number
}

export function Stepper({ stages, currentIndex }: StepperProps) {
  return (
    <div className="mx-1 mb-1 mt-4 flex items-center">
      {stages.map((s, i) => {
        const done = i <= currentIndex
        const cur = i === currentIndex
        return (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex w-20 flex-none flex-col items-center gap-1.5">
              <div
                className={`grid h-[22px] w-[22px] place-items-center rounded-full border-2 ${
                  done ? 'border-navy bg-navy' : cur ? 'border-gold bg-gold' : 'border-line bg-white'
                }`}
              >
                {done && <Icon name="check" className="h-3 w-3 text-white" />}
              </div>
              <small className="text-center text-[10.5px] text-muted">{s}</small>
            </div>
            {i < stages.length - 1 && (
              <div className={`mb-[18px] h-0.5 flex-1 ${i < currentIndex ? 'bg-navy' : 'bg-line'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

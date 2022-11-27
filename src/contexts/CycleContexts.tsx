import { createContext, ReactNode, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  start: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCyclesData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCyclesData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((item) => item.id === activeCycleID)

  function setSecondsPassed(seconds: number): void {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function createNewCycle(data: CreateCyclesData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      start: new Date(),
    }

    setCycles([...cycles, newCycle])
    setActiveCycleID(newCycle.id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleID(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleID,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

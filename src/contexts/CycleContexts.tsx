import { createContext, ReactNode, useReducer, useState } from 'react'
import {
  addNewCycleAction,
  finishCycleAction,
  InterruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCyclesData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  amountSecondsPassed: number
  cycles: Cycle[]
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleID: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleID } = cyclesState

  const activeCycle = cycles.find((item) => item.id === activeCycleID)

  function setSecondsPassed(seconds: number): void {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(finishCycleAction(activeCycleID))
  }

  function createNewCycle(data: CreateCyclesData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      start: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(InterruptCurrentCycleAction(activeCycleID))
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleID,
        amountSecondsPassed,
        cycles,
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

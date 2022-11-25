import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../..'

export function NewCycleForm({ register }: any) {
  const { activeCycle } = useContext(CyclesContext)
  // eslint-disable-next-line

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1"> Projeto 1 </option>
        <option value="Projeto 2"> Projeto 2 </option>
        <option value="Projeto 3"> Projeto 3 </option>
        <option value="Projeto 4"> Projeto 4 </option>
        <option value="Projeto 5"> Projeto 5 </option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        step={5}
        min={5}
        max={60}
        type="number"
        id="minutesAmount"
        disabled={!!activeCycle}
        placeholder="00"
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos</span>
    </FormContainer>
  )
}

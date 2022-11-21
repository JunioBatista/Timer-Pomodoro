import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function NewCycleForm() {
  const newValidationSchema = zod.object({
    task: zod.string().min(1, 'informe um nome válido'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no minimo 5 minuto')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
  })

  type newCycleFormData = zod.infer<typeof newValidationSchema>

  const { register, handleSubmit, watch, formState, reset } =
    useForm<newCycleFormData>({
      resolver: zodResolver(newValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

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

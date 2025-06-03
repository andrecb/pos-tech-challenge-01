import type { Meta, StoryObj } from "@storybook/react"
import { MaskedInput } from "./masked-input"

const meta: Meta<typeof MaskedInput> = {
  title: "UI/MaskedInput",
  component: MaskedInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof MaskedInput>

export const Currency: Story = {
  args: {
    mask: "currency",
    placeholder: "R$ 0,00",
  },
}

export const Number: Story = {
  args: {
    mask: "number",
    placeholder: "0",
  },
}

export const Phone: Story = {
  args: {
    mask: "phone",
    placeholder: "(00) 00000-0000",
  },
}

export const CPF: Story = {
  args: {
    mask: "cpf",
    placeholder: "000.000.000-00",
  },
}

export const CNPJ: Story = {
  args: {
    mask: "cnpj",
    placeholder: "00.000.000/0000-00",
  },
}

export const WithoutMask: Story = {
  args: {
    placeholder: "Digite algo...",
  },
} 
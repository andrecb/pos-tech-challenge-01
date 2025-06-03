import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "./button"

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Criar Projeto</CardTitle>
        <CardDescription>Deploy seu novo projeto em um clique.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Conteúdo do card aqui.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
} 
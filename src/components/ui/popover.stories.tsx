import type { Meta, StoryObj } from "@storybook/react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { Button } from "./button"

const meta = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensões</h4>
            <p className="text-sm text-muted-foreground">
              Defina as dimensões do componente.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
} 
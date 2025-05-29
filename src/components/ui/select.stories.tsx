import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./select";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opcao1">Opção 1</SelectItem>
        <SelectItem value="opcao2">Opção 2</SelectItem>
        <SelectItem value="opcao3">Opção 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}; 
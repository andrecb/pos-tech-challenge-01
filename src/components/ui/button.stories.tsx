import React from "react";
import { Button } from "./button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Botão padrão",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destrutivo</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Pequeno</Button>
      <Button size="default">Padrão</Button>
      <Button size="lg">Grande</Button>
      <Button size="icon">Ícone</Button>
    </div>
  ),
}; 
import React from "react";
import { Separator } from "./separator";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => <Separator />,
};

export const Vertical: Story = {
  render: () => <Separator orientation="vertical" style={{ height: 40 }} />,
}; 
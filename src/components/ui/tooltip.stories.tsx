import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button style={{ padding: 8 }}>Passe o mouse</button>
      </TooltipTrigger>
      <TooltipContent>Dica de tooltip</TooltipContent>
    </Tooltip>
  ),
}; 
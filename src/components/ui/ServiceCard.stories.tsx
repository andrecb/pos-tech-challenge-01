import { ServiceCard } from "./ServiceCard";
import { Home } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ServiceCard> = {
  title: "UI/ServiceCard",
  component: ServiceCard,
};
export default meta;

type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    title: "Serviço Exemplo",
    description: "Descrição do serviço de exemplo.",
    icon: Home,
    onClick: () => alert("Clicou no serviço!"),
  },
}; 
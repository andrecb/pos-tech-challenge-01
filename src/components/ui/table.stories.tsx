import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>João</TableCell>
          <TableCell>joao@email.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Maria</TableCell>
          <TableCell>maria@email.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}; 
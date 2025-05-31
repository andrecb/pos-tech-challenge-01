import * as React from "react"
import { NumericFormat } from "react-number-format"
import { cn } from "@/lib/utils"

interface MaskedInputProps extends React.ComponentProps<typeof NumericFormat> {
  mask?: "currency" | "number" | "phone" | "cpf" | "cnpj"
  className?: string
}

const maskConfigs = {
  currency: {
    thousandSeparator: ".",
    decimalSeparator: ",",
    prefix: "R$ ",
    decimalScale: 2,
    fixedDecimalScale: true,
  },
  number: {
    thousandSeparator: ".",
    decimalSeparator: ",",
    decimalScale: 0,
  },
  phone: {
    format: "(##) #####-####",
    mask: "_",
  },
  cpf: {
    format: "###.###.###-##",
    mask: "_",
  },
  cnpj: {
    format: "##.###.###/####-##",
    mask: "_",
  },
}

export function MaskedInput({ mask, className, ...props }: MaskedInputProps) {
  const maskConfig = mask ? maskConfigs[mask] : {}

  return (
    <NumericFormat
      className={cn(
        "flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...maskConfig}
      {...props}
    />
  )
} 
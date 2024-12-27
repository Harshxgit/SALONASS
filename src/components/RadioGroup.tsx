import React from 'react'

interface RadioGroupProps {
  children: React.ReactNode
  value: string
  onChange: (value: string) => void
}

export function RadioGroup({ children, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<any>;
          return React.cloneElement(element, { 
            checked: element.props.value === value,
            onChange: () => onChange(element.props.value)
          })
        }
        return child
      })}
    </div>
  )
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function RadioGroupItem({ label, ...props }: RadioGroupItemProps) {
  return (
    <label className="flex items-center space-x-2">
      <input type="radio" className="form-radio" {...props} />
      <span>{label}</span>
    </label>
  )
}


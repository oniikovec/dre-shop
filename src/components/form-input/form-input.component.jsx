import { Group, FormInputLabel, Input } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  
  return (
    <Group>
      <Input { ...otherProps } />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput;

// if label exists, render it
// if label value is higher than 0, use shrink
import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
  
  return (
    <div className="group">
      <input className="form-input" { ...otherProps } />
      {label && <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>}
    </div>
  )
}

export default FormInput;

// if label exists, render it
// if label value is higher than 0, add 'shrink' class
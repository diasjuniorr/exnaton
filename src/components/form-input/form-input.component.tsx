import "./form-input.styles.scss";

interface FormInputProps {
  required?: boolean;
  disabled?: boolean;
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label ? (
        <label
          className={`${otherProps.value ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;

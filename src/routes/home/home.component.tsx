import { ChangeEvent, useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import "./home.styles.css";

interface FormFields {
  meterID: string;
  measurement: string;
  limit: number;
}

const defaultFormFields = {
  meterID: "53d63d3d-1b29-49a6-8e5f-537c730f4d11",
  measurement: "energy",
  limit: 1,
};

const Home = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="authentication-container">
      <form action="" style={{width: "100%"}}>
        <FormInput
          label="Meter ID"
          type="text"
          name="meterID"
          value={formFields.meterID}
          onChange={handleChange}
          disabled
        />
        <FormInput
          label="Measurement"
          type="text"
          name="measurement"
          value={formFields.measurement}
          onChange={handleChange}
          disabled
        />
        {/* <label>Start Date</label> */}
        {/* <input type="text" /> */}
        {/* <label>Stop Date</label> */}
        {/* <input type="text" /> */}
        <FormInput
          label="Limit"
          type="number"
          name="limit"
          value={formFields.limit}
          onChange={handleChange}
        />
        <button>View</button>
      </form>
    </div>
  );
};

export default Home;

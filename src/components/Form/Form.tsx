import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { Search } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: Search) => Promise<void>;
};

export default function Form({ fetchWeather }: FormProps) {
  // States
  const [search, setSearch] = useState<Search>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  // Handlers
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate not empty fields
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }
    fetchWeather(search);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      {/* Field: City */}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ej: Santiago"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      {/* Field: Country */}
      <div className={styles.field}>
        <label htmlFor="country">País</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">Seleccione un país</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type="submit" value="Consultar clima" />
    </form>
  );
}

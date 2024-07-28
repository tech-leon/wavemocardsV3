import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import md5 from "md5";

const occupations = [
  "暫不透露",
  "學生",
  "教師",
  "工程師",
  "醫生",
  "律師",
  "商人",
  "藝術家",
  "其他",
];

const Register = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    birthday: null,
    occupation: "暫不透露",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const { email, name, password, confirmPassword } = formData;

    if (touched.email && !email) {
      newErrors.email = t("pages.register.form.emailEmptyError");
    } else if (touched.email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("pages.register.form.emailSyntaxError");
    }

    if (touched.name && !name) {
      newErrors.name = t("pages.register.form.nameEmptyError");
    }

    if (touched.password && !password) {
      newErrors.password = t("pages.register.form.passwordEmptyError");
    } else if (
      touched.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password = t("pages.register.form.passwordRequirementError");
    }

    if (touched.confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = t("pages.register.form.confirmPasswordError");
    }

    setErrors(newErrors);
    setIsFormValid(
      Object.keys(newErrors).length === 0 && Object.keys(touched).length === 4
    );
  }, [formData, touched, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      name: true,
      password: true,
      confirmPassword: true,
    });
    validateForm();
    if (!isFormValid) return;

    try {
      const auth = getAuth();
      const { email, password, birthday, occupation } = formData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
        email.toLowerCase().trim()
      )}?d=404`;
      const response = await fetch(gravatarUrl);
      if (response.ok) {
        await user.updateProfile({
          photoURL: gravatarUrl,
        });
      }

      console.log("Birthday:", birthday);
      console.log("Occupation:", occupation);

      await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors((prev) => ({ ...prev, general: error.message }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const renderInput = (name, type, placeholder) => (
    <div className="relative">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <input
        id={name}
        name={name}
        type={showPassword[name] ? "text" : type}
        required
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
          errors[name] && touched[name] ? "border-red-300" : "border-gray-300"
        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      {(name === "password" || name === "confirmPassword") && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800"
          onClick={() => togglePasswordVisibility(name)}
        >
          {showPassword[name] ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {errors[name] && touched[name] && (
        <p className="text-red-500 text-xs mt-1 whitespace-pre-line">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("register.title")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm -space-y-px">
            {renderInput("email", "email", t("register.email"))}
            {renderInput("name", "text", t("register.name"))}
            {renderInput("password", "password", t("register.password"))}
            {renderInput(
              "confirmPassword",
              "password",
              t("register.confirmPassword")
            )}
            <div className="relative w-1/2">
              <label htmlFor="birthday" className="sr-only">
                {t("register.birthday")}
              </label>
              <DatePicker
                id="birthday"
                name="birthday"
                selected={formData.birthday}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, birthday: date }))
                }
                dateFormat="dd / MM / yyyy"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholderText={t("dd / MM / yyyy")}
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div>
              <label htmlFor="occupation" className="sr-only">
                {t("register.occupation")}
              </label>
              <select
                id="occupation"
                name="occupation"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.occupation}
                onChange={handleInputChange}
              >
                {occupations.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              {t("register.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
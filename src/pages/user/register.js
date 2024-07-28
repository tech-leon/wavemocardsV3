import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import md5 from "md5";
import Form from "../../components/common/Form";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("register.title")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <Form
            formData={formData}
            errors={errors}
            touched={touched}
            showPassword={showPassword}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            togglePasswordVisibility={togglePasswordVisibility}
            t={t}
          />
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

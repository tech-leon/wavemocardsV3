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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [occupation, setOccupation] = useState("暫不透露");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (touched.email && !email) {
      newErrors.email = t("register.emailRequired");
    } else if (touched.email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("register.invalidEmail");
    }

    if (touched.name && !name) {
      newErrors.name = t("register.nameRequired");
    }

    if (touched.password && !password) {
      newErrors.password = t("register.passwordRequired");
    } else if (
      touched.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password = t("register.passwordRequirements");
    }

    if (touched.confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = t("register.passwordMismatch");
    }

    setErrors(newErrors);
    setIsFormValid(
      Object.keys(newErrors).length === 0 && Object.keys(touched).length === 4
    );
  }, [email, name, password, confirmPassword, touched, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "name":
        setName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirm-password":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm();
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
      "confirm-password": true,
    });
    validateForm();
    if (!isFormValid) return;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get Gravatar URL
      const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
        email.toLowerCase().trim()
      )}?d=404`;
      const response = await fetch(gravatarUrl);
      if (response.ok) {
        // Update user profile with Gravatar URL
        await user.updateProfile({
          photoURL: gravatarUrl,
        });
      }

      console.log("Birthday:", birthday);
      console.log("Occupation:", occupation);

      await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ ...errors, general: error.message });
    }
  };

  // const formatDate = (date) => {
  //   if (!date) return "dd / mm / yyyy";
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day} / ${month} / ${year}`;
  // };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
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
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                {t("register.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t("register.email")}
                value={email}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                {t("register.name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t("register.name")}
                value={name}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            {/* 密碼欄位 */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">{t('register.password')}</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password && touched.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t('register.password')}
                value={password}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && touched.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

            {/* 確認密碼欄位 */}
            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">{t('register.confirmPassword')}</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.confirmPassword && touched.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t('register.confirmPassword')}
                value={confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}

            {/* 生日欄位 */}
            <div className="relative w-1/2">
              <label htmlFor="birthday" className="sr-only">{t('register.birthday')}</label>
              <DatePicker
                id="birthday"
                name="birthday"
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                dateFormat="dd / MM / yyyy"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholderText={t('dd / MM / yyyy')}
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
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
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

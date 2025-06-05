# React App: Login with Formik, Yup and Context API

This application serves as a **Proof of Concept (PoC)** for:

* ✅ Authentication
* ✅ Form validation
* ✅ Page routing

---

## 1. 🔐 POC 1: Authentication with Context API

This section explains how user authentication is implemented using React's built-in **Context API**, ensuring that the authentication state (login/logout) is globally accessible throughout the application.

### ✅ How it works:

* **Setup:** Create a context to share authentication data globally.

```js
import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
```

* **AuthProvider Component:**
  Provides `isAuthenticated`, `login()` and `logout()` methods to all components.

```js
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

* **Custom Hook (`useAuth`):**

```js
export const useAuth = () => useContext(AuthContext);
```

Usage:

```js
const { isAuthenticated, login, logout } = useAuth();
```

* **Private Routing:**

Prevents unauthorized users from accessing protected routes.

```js
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}
```

Usage in routing:

```jsx
<Route path="/dashboard" element={
  <PrivateRoute>
    <Dashboard />
  </PrivateRoute>
} />
```

---

## 2. ✅ POC 2: Form Validation with Formik and Yup

This section explains how login form validation is implemented using:

* **Formik** to manage form state
* **Yup** to define and enforce validation rules

### ✅ Features

* Field values and changes
* Validation status and errors
* Form submission lifecycle
* Declarative schema-based validation with custom error messages

### ✅ Setup

```js
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
```

### ✅ Validation Schema with Yup

```js
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    )
    .required("Required"),
});
```

**Regex explained:**

* `(?=.*[A-Z])` – at least one uppercase letter
* `(?=.*\d)` – at least one number
* `(?=.*[@$!%*?&])` – at least one special character
* `[A-Za-z\d@$!%*?&]+` – allows only these characters

### ✅ LoginPage Component

```js
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            if (
              values.email === "test@example.com" &&
              values.password === "123456A*"
            ) {
              login();
              navigate("/dashboard");
            } else {
              setErrors({ password: "Invalid email or password" });
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
```

### ✅ Summary

* Formik manages input state, validation, submission
* Yup enforces rules via `validationSchema`
* `setErrors` shows custom messages
* Fields are managed using `<Field />`
* Errors are shown via `<ErrorMessage />`
* Button disabled while submitting

---

## 3. 🌐 POC 3: Page Routing with `react-router-dom`

Routing is managed using `react-router-dom` to enable page navigation and protect routes.

### ✅ Route Configuration

```jsx
<Route path="/" element={<LoginPage />} />
<Route path="/dashboard" element={
  <PrivateRoute>
    <Dashboard />
  </PrivateRoute>
} />
```

### ✅ Global Auth Provider

Wraps all routes with `AuthProvider`:

```jsx
<AuthProvider>
  <Router>
    <Routes>...</Routes>
  </Router>
</AuthProvider>
```

### ✅ Programmatic Navigation

Uses `useNavigate()` after successful login:

```js
const navigate = useNavigate();
...
login();               // updates auth state
navigate("/dashboard"); // redirect to dashboard
```

---

## 🧪 Test Credentials

Use these to log in:

* **Email:** `test@example.com`
* **Password:** `123456A*`

import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import { AdminRoute } from "@/routes/components/admin-route";
import { ProtectedRoute } from "@/routes/components/protected-route";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { Error404 } from "@/common/error-boundary/error/404";
import { selectIsLoggedIn } from "@/store/reducers/auth";

const AuthRoutes = lazy(() => import("@/routes/Auth.routes"));
const ProtectedRoutes = lazy(() => import("@/routes/Protected.routes"));
const Book = lazy(() => import("@/pages/Book/Books").then(({ Book }) => ({ default: Book })));
const BookDetails = lazy(() =>
  import("@/pages/BookDetails/BookDetails").then(({ BookDetails }) => ({ default: BookDetails })),
);
const Cart = lazy(() => import("@/pages/Cart/Cart").then(({ Cart }) => ({ default: Cart })));
const ChangePasswordForm = lazy(
  () => import("@/features/login-page/components/forms/change-password-form"),
);
const Favorites = lazy(() =>
  import("@/pages/Favorites/Favorites").then(({ Favorites }) => ({ default: Favorites })),
);
const Home = lazy(() => import("@/pages/Home/Home").then(({ Home }) => ({ default: Home })));
const Orders = lazy(() =>
  import("@/pages/Orders/Orders").then(({ Orders }) => ({ default: Orders })),
);
const OrdersAdmin = lazy(() =>
  import("@/pages/OrdersAdmin/OrdersAdmin").then(({ OrdersAdmin }) => ({
    default: OrdersAdmin,
  })),
);
const OnSuccessRegister = lazy(() => import("@/features/register-page/results"));
const Profile = lazy(() =>
  import("@/pages/Profile/Profile").then(({ Profile }) => ({ default: Profile })),
);

type TProtectedPageProps = {
  children: React.ReactNode;
  isLoggedIn: boolean;
  loading: boolean;
};

const ProtectedPage = ({ children, isLoggedIn, loading }: TProtectedPageProps) => (
  <ProtectedRoute isLoggedIn={isLoggedIn}>
    <Suspense fallback={loading}>{children}</Suspense>
  </ProtectedRoute>
);

export const LandingPageRouting = () => {
  const { loading } = useNotificationContext();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Home />
          </ProtectedPage>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Home />
          </ProtectedPage>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Home />
          </ProtectedPage>
        }
      />
      <Route
        path="/success"
        element={
          <Suspense fallback={loading}>
            <OnSuccessRegister />
          </Suspense>
        }
      />
      <Route path="/*" element={<Error404 />} />

      {!isLoggedIn && (
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={loading}>
              <AuthRoutes />
            </Suspense>
          }
        />
      )}
      {isLoggedIn && <Route path="/auth/*" element={<Navigate replace to="/home" />} />}

      <Route
        path="/cart"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Cart />
          </ProtectedPage>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Orders />
          </ProtectedPage>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <AdminRoute>
              <OrdersAdmin />
            </AdminRoute>
          </ProtectedPage>
        }
      />
      <Route
        path="/protected/*"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <ProtectedRoutes />
          </ProtectedPage>
        }
      />
      <Route
        path="/book/:bookId"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <BookDetails />
          </ProtectedPage>
        }
      />
      <Route
        path="/book/*"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Book />
          </ProtectedPage>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Favorites />
          </ProtectedPage>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Profile />
          </ProtectedPage>
        }
      />
      <Route
        path="auth/change-password"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <ChangePasswordForm />
          </ProtectedPage>
        }
      />
    </Routes>
  );
};

import { LoginForm } from "@/components/auth/login-form";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/lib/locale";

export default async function LoginPage() {
  const dict = getDictionary(await getLocale());

  return (
    <LoginForm
      labels={{
        title: dict.auth.loginTitle,
        hint: dict.copy.loginStaffHint,
        email: dict.copy.loginEmail,
        password: dict.auth.password,
        signIn: dict.auth.signIn,
        signingIn: dict.copy.signingIn,
      }}
    />
  );
}

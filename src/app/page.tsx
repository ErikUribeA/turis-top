import SelectLanguage from '@/components/inputs/SelectLanguage';
import { LoginButton } from '../components/buttons/LoginButton'; 
import { useTranslations } from "next-intl";

export default function Home() {
  const translate = useTranslations('');

  return (
    <div>
      <h1> {translate("grettings")} </h1>
      <SelectLanguage />
      <LoginButton />
    </div>
  );
}

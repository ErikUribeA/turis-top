'use client'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"
import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";

export default function SelectLanguage() {
    const router = useRouter()
    const translate = useTranslations("language")

    const handleLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value
        Cookies.set("locale", selectedLanguage)
        router.refresh()
    };

    return (
        <div>
            <select onChange={handleLanguage} defaultValue="">
                <option value="" disabled>{translate("select")}</option>
                <option value="es"> {translate("OptionEs")} </option>
                <option value="en"> {translate("OptionEn")} </option>
            </select>
        </div>
    )
}
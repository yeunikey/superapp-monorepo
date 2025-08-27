import { useAuthStore } from "../model/useAuthStore";
import { useRef } from "react";

function CodeForm() {

    const { codeDigits, setCodeDigit } = useAuthStore();

    const codeRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        setCodeDigit(index, value);
        if (value && index < 3) {
            codeRefs[index + 1].current?.focus();
        }
    };

    return (
        <div className="flex flex-col justify-center gap-3 items-center">
            <div className="flex gap-3">
                {codeDigits.map((digit, index) => (
                    <input
                        key={index}
                        ref={codeRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-12 h-12 text-xl text-center rounded-xl bg-white focus:outline-primary"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Backspace" && codeDigits[index] === "" && index > 0) {
                                codeRefs[index - 1].current?.focus();
                            }
                        }}
                    />
                ))}
            </div>

            <div className="text-secondary text-sm text-center">
                * из корпоративной почты
            </div>
        </div>
    );
}

export default CodeForm;
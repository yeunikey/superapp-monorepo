import { useAuthStore } from "../model/useAuthStore";

function LoginForm() {

    const { email, setEmail } = useAuthStore();

    return (
        <div className="space-y-2">
            <div className="flex items-center bg-white py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary">
                <input
                    type="text"
                    placeholder="Ваша почта"
                    className="outline-none text-dark bg-transparent w-full"

                    value={email}
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }}
                />
                <div className="text-secondary">@astanait.edu.kz</div>
            </div>

            <div className="text-secondary text-sm">
                * корпоративная почта университета
            </div>
        </div>
    );
}

export default LoginForm;
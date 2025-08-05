import Image from "next/image";

function AuthPage() {
    return (
        <div className="h-dvh w-full flex items-center justify-center">

            <div className="flex flex-col gap-12 items-center w-72">
                <Image
                    src={'/logo.png'}
                    alt="Astana IT University Logotype"
                    width={1400}
                    height={700}

                    className="h-32 w-auto"
                />

                <div className="space-y-2">
                    <div className="flex items-center bg-white py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary">
                        <input
                            type="text"
                            placeholder="Ваша почта"
                            className="outline-none text-dark bg-transparent w-full"
                        />
                        <span className="text-secondary">@astanait.edu.kz</span>
                    </div>

                    <div className="text-secondary text-sm">
                        * корпоративная почта университета
                    </div>
                </div>

                <button className="bg-primary rounded-4xl py-2 w-full text-white cursor-pointer font-medium box-content">Отправить код</button>
            </div>

        </div>
    );
}

export default AuthPage;
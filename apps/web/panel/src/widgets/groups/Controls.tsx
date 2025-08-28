import { toast } from "react-toastify";
import { useGroupsStore } from "@/features/users/model/useGroupsStore";

function Controls() {

    const {
        searchText, setSearchText,
        setAddModal
    } = useGroupsStore();

    return (
        <div className="mt-6 flex gap-6">
            <div className="flex items-center bg-white py-2 px-4 rounded-4xl focus-within:outline-2 outline-primary w-80">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    className="outline-none text-dark bg-transparent w-full"

                    value={searchText}
                    onChange={(e) => setSearchText(e.currentTarget.value)}
                />
            </div>

            <div className="flex gap-3">
                <div className="bg-primary rounded-full py-2 px-6 text-white cursor-pointer"
                    onClick={() => setAddModal(true)}
                >
                    Добавить
                </div>

                <div className="outline-primary outline-2 rounded-full py-2 px-6 text-primary cursor-pointer"
                    onClick={() => toast.warn('В разработке...')}
                >
                    Экспорт
                </div>
            </div>
        </div>
    );
}

export default Controls;
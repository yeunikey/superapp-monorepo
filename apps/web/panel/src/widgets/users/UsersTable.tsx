import { useUsers } from "@/entities/data/model/useUsers";
import { useUsersStore } from "@/features/users/model/useUsersStore";
import UserItem from "./UserItem";

function UsersTable() {

    const { users } = useUsers();
    const { searchText } = useUsersStore();

    return (
        <div className="mt-12 bg-white rounded-4xl flex flex-col">

            <div className="py-6 px-6 flex flex-row">
                <div className="text-secondary min-w-lg">
                    Изображение, ФИО
                </div>
                <div className="grow grid grid-cols-4">
                    <div className="text-secondary">
                        Роль
                    </div>
                    <div className="text-secondary">
                        Группа
                    </div>
                    <div className="text-secondary">
                        Очки
                    </div>
                    <div className="text-secondary" />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="bg-background w-[95%] h-0.5" />
            </div>

            {users
                .filter(u => (u.name + ' ' + u.surname).toLowerCase().includes(searchText.toLowerCase()))
                .map((user) => <UserItem user={user} key={user.id}/>)
            }
        </div>
    );
}

export default UsersTable;
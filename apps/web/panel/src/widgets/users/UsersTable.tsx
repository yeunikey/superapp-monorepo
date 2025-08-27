import Avatar from "@/shared/ui/Avatar";
import { User } from "@/entities/data/types/user";
import { useEditModal } from "@/features/users/model/modal/useEditModal";
import { useUsers } from "@/entities/data/model/useUsers";
import { useUsersStore } from "@/features/users/model/useUsersStore";

function UsersTable() {

    const { users } = useUsers();
    const { searchText } = useUsersStore();

    const { setEditModal } = useUsersStore();
    const { setUser } = useEditModal();

    const drawUser = (user: User) => {
        return (
            <div key={user.id}>
                <div className="py-4 px-6 flex flex-row">

                    <div className="flex gap-4 items-center min-w-lg">
                        <Avatar user={user} />
                        <div className="text-lg font-semibold text-dark">
                            {user.surname} {user.name}
                        </div>
                    </div>

                    <div className="grow grid grid-cols-4 items-center">
                        <div>
                            {user.role ? (
                                <div className="bg-red py-1 px-4 rounded-full text-white w-fit text-sm">
                                    {user.role?.name ?? "—"}
                                </div>
                            ) : (
                                <div className="bg-primary py-1 px-4 rounded-full text-white w-fit text-sm">
                                    Студент
                                </div>
                            )}
                        </div>

                        <div className="text-secondary text-sm">
                            {user.group?.name ?? "—"}
                        </div>

                        <div className="flex gap-3 items-center text-sm text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="18px"
                                viewBox="0 -960 960 960"
                                width="18px"
                                fill="#9BA3AE"
                            >
                                <path d="M360-360H236q-24 0-35.5-21.5T203-423l299-430q10-14 26-19.5t33 .5q17 6 25 21t6 32l-32 259h155q26 0 36.5 23t-6.5 43L416-100q-11 13-27 17t-31-3q-15-7-23.5-21.5T328-139l32-221Z" />
                            </svg>
                            {user.scores}
                        </div>

                        <div className="flex justify-end">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background cursor-pointer"
                                onClick={() => {
                                    setEditModal(true);
                                    setUser(user);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="bg-background w-[95%] h-0.5" />
                </div>
            </div>
        )
    }

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
                .map((user) => drawUser(user))
            }
        </div>
    );
}

export default UsersTable;
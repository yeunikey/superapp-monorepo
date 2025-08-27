import { ApiResponse } from "@/types";
import { Group } from "@/entities/data/types/group";
import { User } from "@/entities/data/types/user";
import { userApi as dataApi } from "@/shared/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/data/model/useAuth";
import { useGroups } from "@/entities/data/model/useGroups";
import { useUsers } from "@/entities/data/model/useUsers";

const fetchUsers = async () => {

    const { token } = useAuth.getState();
    const { setUsers } = useUsers.getState();

    if (!token) {
        return;
    }

    await dataApi.get<ApiResponse<User[]>>('/users/all', {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(({ data }) => {
            if (data.statusCode != 200) {
                toast.error(data.message)
                return;
            }
            setUsers(data.data)
        })
}

const fetchGroups = async () => {

    const { setGroups } = useGroups.getState();

    await dataApi.get<ApiResponse<Group[]>>('/groups/all')
        .then(({ data }) => {
            if (data.statusCode != 200) {
                toast.error(data.message)
                return;
            }
            setGroups(data.data)
        })
}

export {
    fetchUsers,
    fetchGroups
}
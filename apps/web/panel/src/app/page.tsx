"use client";;

import UserAddModal from "@/features/users/ui/UserAddModal";
import Controls from "@/widgets/users/Controls";
import UserEditModal from "@/features/users/ui/UserEditModal";
import UsersTable from "@/widgets/users/UsersTable";
import View from "@/shared/ui/View";
import { fetchUsers } from "@/features/users/model/usersService";
import { useAuth } from "@/entities/data/model/useAuth";
import { useEffect } from "react";

export default function Users() {

  const { token } = useAuth();

  useEffect(() => {
    fetchUsers()
  }, [token])

  return (
    <View>

      {/* Modals */}
      <UserAddModal />
      <UserEditModal />

      {/* Content */}

      <div className="text-3xl font-semibold text-dark">
        Управление пользователями
      </div>

      <Controls />
      <UsersTable />

    </View>
  );
}

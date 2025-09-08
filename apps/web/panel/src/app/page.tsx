"use client";;

import NewUserModal from "@/features/users/ui/NewUserModal";
import UserControls from "@/widgets/users/UserControls";
import EditUserModal from "@/features/users/ui/EditUserModal";
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
      <NewUserModal />
      <EditUserModal />

      {/* Content */}

      <div className="text-3xl font-semibold text-dark">
        Управление пользователями
      </div>

      <UserControls />
      <UsersTable />

    </View>
  );
}

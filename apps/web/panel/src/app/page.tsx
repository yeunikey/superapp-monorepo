"use client";;

import AddModal from "@/features/users/ui/AddModal";
import Controls from "@/widgets/users/Controls";
import EditModal from "@/features/users/ui/EditModal";
import UsersTable from "@/widgets/users/UsersTable";
import View from "@/shared/ui/View";
import { fetchUsers } from "@/features/users/model/usersService";
import { useAuth } from "@/entities/data/model/useAuth";
import { useEffect } from "react";

export default function Home() {

  const { token } = useAuth();

  useEffect(() => {
    fetchUsers()
  }, [token])

  return (
    <View>

      {/* Modals */}
      <AddModal />
      <EditModal />

      {/* Content */}

      <div className="text-3xl font-semibold text-dark">
        Управление пользователями
      </div>

      <Controls />
      <UsersTable />

    </View>
  );
}

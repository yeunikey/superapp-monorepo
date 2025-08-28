"use client";;

import GroupAddModal from "@/features/groups/ui/GroupAddModal";
import UserEditModal from "@/features/users/ui/UserEditModal";
import View from "@/shared/ui/View";
import { useAuth } from "@/entities/data/model/useAuth";
import { useEffect } from "react";
import Controls from "@/widgets/groups/Controls";
import GroupsTable from "@/widgets/groups/GroupsTable";
import { fetchGroups } from "@/features/users/model/usersService";
import GroupEditModal from "@/features/groups/ui/GroupEditModal";

export default function Groups() {

  const { token } = useAuth();

  useEffect(() => {
    fetchGroups()
  }, [token])

  return (
    <View>

      {/* Modals */}
      <GroupAddModal />
      <GroupEditModal />

      {/* Content */}
      <div className="text-3xl font-semibold text-dark">
        Управление группами
      </div>

      <Controls />
      <GroupsTable />

    </View>
  );
}
